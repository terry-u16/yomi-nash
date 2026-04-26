import { SHARE_SCHEMA_VERSION } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";
import { encodeShareObject } from "@/utils/shareCodec";

export interface CreateShareUrlOptions {
  baseUrl?: string;
  result?: GameResult | null;
}

export interface SharedGameResultV2 {
  player1Probabilities: number[];
  player2Probabilities: number[];
}

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
  params.set("gameInput", encodeShareObject(inputUI));

  if (result) {
    params.set("gameResult", encodeShareObject(toSharedGameResultV2(result)));
  }

  return `${baseUrl}?${params.toString()}`;
}

function toSharedGameResultV2(result: GameResult): SharedGameResultV2 {
  return {
    player1Probabilities: result.player1Strategy.map(
      ({ probability }) => probability
    ),
    player2Probabilities: result.player2Strategy.map(
      ({ probability }) => probability
    ),
  };
}
