// utils/solveGameInput.ts
import type { GameInput } from "../types/game";
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

export function solveGame(input: GameInput): GameResult {
  const A = input.payoffMatrix;

  const glpk = GLPK();

  function solveMinV(A: number[][]): {
    status: number;
    value: number;
    x: number[];
  } {
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

    const result = glpk.solve(lp, { msglev: glpk.GLP_MSG_OFF });

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

  const player1Sol = solveMinV(transposeAndNegate(A));
  const player2Sol = solveMinV(A);

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
    expectedPayoff: player1Sol.value,
  };
}
