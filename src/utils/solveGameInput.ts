import type { GameInput, MixedStrategy, PayoffMatrix } from "../types/game";
import GLPK, { type LP } from "glpk.js";
import type { GameResult } from "../types/game";

interface Var {
  name: string;
  coef: number;
}

interface Constraint {
  name: string;
  vars: Var[];
  bnds: {
    type: number;
    ub: number;
    lb: number;
  };
}

interface Bound {
  name: string;
  type: number;
  ub: number;
  lb: number;
}

export async function solveGame(input: GameInput): Promise<GameResult> {
  const A = input.payoffMatrix;
  const glpk = await GLPK();

  async function solveMinV(A: number[][]): Promise<{
    status: number;
    value: number;
    x: number[];
  }> {
    const N = A.length;
    const M = A[0].length;

    const subjectTo: Constraint[] = [];
    const bounds: Bound[] = [];

    // max_i(Σ_j A[i][j] * xj) を最小化する x を求める
    // これは、相手がこちらに対して最小の利得となるような戦略を取ると悲観的に考えることに相当する
    // max_i(Σ_j A[i][j] * xj) を最小化するには、v >= Σ_j A[i][j] * xj の条件下で v を最小化すればよい
    //
    // 各行 i について: v >= Σ_j A[i][j] * xj
    // すなわち、 v - Σ_j A[i][j] * xj >= 0 とする
    for (let i = 0; i < N; i++) {
      const vars: Var[] = [{ name: "v", coef: 1 }];
      for (let j = 0; j < M; j++) {
        vars.push({ name: `x${j}`, coef: -A[i][j] });
      }
      subjectTo.push({
        name: `ineq_row${i}`,
        vars,
        bnds: { type: glpk.GLP_LO, lb: 0, ub: 0 },
      });
    }

    // Σ_j xj = 1 の制約
    subjectTo.push({
      name: "sum_to_one",
      vars: Array.from({ length: M }, (_, j) => ({ name: `x${j}`, coef: 1 })),
      bnds: { type: glpk.GLP_FX, lb: 1, ub: 1 },
    });

    // v は特に制約を持たず、これを最小化する
    bounds.push({ name: "v", type: glpk.GLP_FR, lb: 0, ub: 0 });

    // x1, x2, ..., xM >= 0
    for (let j = 0; j < M; j++) {
      bounds.push({ name: `x${j}`, type: glpk.GLP_LO, lb: 0, ub: 0 });
    }

    const lp: LP = {
      name: "min_value_mixture",
      objective: {
        direction: glpk.GLP_MIN,
        name: "obj",
        vars: [{ name: "v", coef: 1 }],
      },
      subjectTo,
      bounds,
    };

    const result = await glpk.solve(lp, { msglev: glpk.GLP_MSG_OFF });

    return {
      status: result.result.status,
      value: result.result.vars.v,
      x: Array.from({ length: M }, (_, j) => result.result.vars[`x${j}`]),
    };
  }

  function transposeAndNegate(A: number[][]): number[][] {
    const N = A.length;
    const M = A[0].length;
    const B = Array.from({ length: M }, () => Array(N).fill(0));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        B[j][i] = -A[i][j];
      }
    }

    return B;
  }

  const ATransposedAndNagate = transposeAndNegate(A);
  const player1Sol = await solveMinV(ATransposedAndNagate);
  const player2Sol = await solveMinV(A);

  if (
    player1Sol.status !== glpk.GLP_OPT ||
    player2Sol.status !== glpk.GLP_OPT
  ) {
    throw new Error("最適解が見つかりませんでした");
  }

  const strategyLabelsP1 = input.strategyLabels1;
  const strategyLabelsP2 = input.strategyLabels2;

  const player1Strategy = strategyLabelsP1.map((label, i) => ({
    label,
    probability: player1Sol.x[i],
  }));
  const player2Strategy = strategyLabelsP2.map((label, i) => ({
    label,
    probability: player2Sol.x[i],
  }));

  return {
    player1Strategy,
    player2Strategy,
    payoffMatrix12: A,
    payoffMatrix21: ATransposedAndNagate,
  };
}

/**
 * 相手の混合戦略に対して、自分の各純粋戦略（行）を選んだ場合の期待利得を個別に計算する。
 *
 * この関数は、自分の混合戦略を最適化する前に、
 * 各純粋戦略の期待値を可視化・比較する用途に適する。
 *
 * 利得行列 matrix は「自分の戦略が行、相手の戦略が列」に対応する形式を前提とする。
 * opponentStrategy の順序は、matrix の列順と一致している必要がある。
 *
 * @param matrix 利得行列（自分の戦略: 行, 相手の戦略: 列）
 * @param opponentStrategy 相手の混合戦略（順序付きラベルと確率）
 * @returns 自分の各純粋戦略に対応する期待利得の配列
 */
export function evaluatePureStrategies(
  matrix: PayoffMatrix,
  opponentStrategy: MixedStrategy
): number[] {
  return matrix.map((row) =>
    row.reduce((sum, value, j) => {
      const prob = opponentStrategy[j]?.probability ?? 0;
      return sum + value * prob;
    }, 0)
  );
}

/**
 * 自分と相手の混合戦略に対して、プレイヤー1の利得期待値（スカラー）を計算する。
 *
 * この関数は、2人ゼロサムゲームにおけるプレイヤー1の期待利得を評価するために使用する。
 * 利得行列 matrix は「自分の戦略が行、相手の戦略が列」に対応する形式を前提とする。
 * 両戦略の順序は、それぞれ matrix の行・列順と一致している必要がある。
 *
 * 期待利得は以下の式で与えられる：
 *   E = xᵀ A y = Σ_i Σ_j x_i * A_ij * y_j
 *
 * @param matrix 利得行列（自分の戦略: 行, 相手の戦略: 列）
 * @param myStrategy 自分の混合戦略（順序付きラベルと確率）
 * @param opponentStrategy 相手の混合戦略（順序付きラベルと確率）
 * @returns プレイヤー1の利得期待値（スカラー）
 */
export function evaluateMixedStrategyMatchup(
  matrix: PayoffMatrix,
  myStrategy: MixedStrategy,
  opponentStrategy: MixedStrategy
): number {
  return matrix.reduce((sum, row, i) => {
    const p1 = myStrategy[i]?.probability ?? 0;
    const rowSum = row.reduce((innerSum, value, j) => {
      const p2 = opponentStrategy[j]?.probability ?? 0;
      return innerSum + value * p2;
    }, 0);
    return sum + p1 * rowSum;
  }, 0);
}
