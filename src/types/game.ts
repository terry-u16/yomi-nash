export type Strategy = string;
export type PayoffMatrix = number[][];
export type PayoffMatrixUI = string[][];

export interface GameInput {
  strategyLabels1: string[];
  strategyLabels2: string[];
  payoffMatrix: PayoffMatrix;
}

export interface GameInputUI {
  strategyLabels1: string[];
  strategyLabels2: string[];
  payoffMatrix: PayoffMatrixUI;
}

export interface ParseSuccess {
  ok: true;
  data: GameInput;
}

export interface ParseError {
  row: number;
  col: number;
  value: string;
}

export interface ParseFailure {
  ok: false;
  errors: ParseError[];
}

export type ParseResult = ParseSuccess | ParseFailure;

export type MixedStrategyEntry = {
  label: string;
  probability: number;
};

export type MixedStrategy = MixedStrategyEntry[];

export interface GameResult {
  player1Strategy: MixedStrategy;
  player2Strategy: MixedStrategy;
  expectedPayoff: number;
}
