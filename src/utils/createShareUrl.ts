import { SHARE_SCHEMA_VERSION } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";
import { parseGameInputUI } from "@/utils/parseGameInput";
import { encodeShareObject } from "@/utils/shareCodec";

export interface CreateShareUrlOptions {
  baseUrl?: string;
  result?: GameResult | null;
}

export type SharedGameInputV2 = [string[], string[], number[]];

export type SharedGameResultV2 = [number[], number[]];

const defaultBaseUrl = () => {
  if (typeof window === "undefined") {
    throw new Error("baseUrl is required when window is undefined");
  }
  return `${window.location.origin}/`;
};

export function createShareUrl(
  inputUI: GameInputUI,
  options: CreateShareUrlOptions = {}
): string {
  const { baseUrl = defaultBaseUrl(), result } = options;
  const params = new URLSearchParams();
  params.set("schemaVersion", String(SHARE_SCHEMA_VERSION));
  params.set("i", encodeShareObject(toSharedGameInputV2(inputUI)));

  if (result) {
    params.set("r", encodeShareObject(toSharedGameResultV2(result)));
  }

  return `${baseUrl}?${params.toString()}`;
}

function toSharedGameInputV2(inputUI: GameInputUI): SharedGameInputV2 {
  const parsed = parseGameInputUI(inputUI);
  if (!parsed.ok) {
    throw new Error("Cannot share a payoff matrix with invalid numbers");
  }

  return [
    inputUI.strategyLabels1,
    inputUI.strategyLabels2,
    parsed.data.payoffMatrix.flat(),
  ];
}

function toSharedGameResultV2(result: GameResult): SharedGameResultV2 {
  return [
    result.player1Strategy.map(({ probability }) => probability),
    result.player2Strategy.map(({ probability }) => probability),
  ];
}
