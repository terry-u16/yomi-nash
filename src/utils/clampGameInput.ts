import type { GameInputUI } from "@/types/game";
import { isValidNumber } from "@/utils/validators/number";

export const PAYOFF_MIN = -1e6;
export const PAYOFF_MAX = 1e6;

function clampValue(n: number): number {
  return Math.min(Math.max(n, PAYOFF_MIN), PAYOFF_MAX);
}

export function clampGameInputUI(input: GameInputUI): GameInputUI {
  return {
    ...input,
    payoffMatrix: input.payoffMatrix.map((row) =>
      row.map((cell) => {
        return isValidNumber(cell)
          ? clampValue(parseFloat(cell)).toString()
          : "";
      })
    ),
  };
}
