import type { GameInputUI, ParseError, ParseResult } from "@/types/game";

export const isValidNumber = (val: string) => {
  const num = parseFloat(val);
  return val !== "" && !isNaN(num) && isFinite(num);
};

export function parseGameInputUI(input: GameInputUI): ParseResult {
  const errors: ParseError[] = [];
  const parsedMatrix: number[][] = [];

  for (let i = 0; i < input.payoffMatrix.length; i++) {
    const row = input.payoffMatrix[i];
    const parsedRow: number[] = [];

    for (let j = 0; j < row.length; j++) {
      const value = row[j].trim();

      if (isValidNumber(value)) {
        parsedRow.push(parseFloat(value));
      } else {
        errors.push({
          row: i,
          col: j,
          value: "数値を入力してください",
        });
      }
    }

    parsedMatrix.push(parsedRow);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      strategyLabels1: input.strategyLabels1,
      strategyLabels2: input.strategyLabels2,
      payoffMatrix: parsedMatrix,
    },
  };
}
