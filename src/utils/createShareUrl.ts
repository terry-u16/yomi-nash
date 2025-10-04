import { DATA_SCHEMA_VERSION } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";
import { encodeShareObject } from "@/utils/shareCodec";

export interface CreateShareUrlOptions {
  baseUrl?: string;
  result?: GameResult | null;
}

const defaultBaseUrl = () => {
  if (typeof window === "undefined") {
    throw new Error("baseUrl is required when window is undefined");
  }
  return `${window.location.origin}${window.location.pathname}`;
};

export function createShareUrl(
  inputUI: GameInputUI,
  options: CreateShareUrlOptions = {}
): string {
  const { baseUrl = defaultBaseUrl(), result } = options;
  const params = new URLSearchParams();
  params.set("schemaVersion", String(DATA_SCHEMA_VERSION));
  params.set("gameInput", encodeShareObject(inputUI));

  if (result) {
    params.set("gameResult", encodeShareObject(result));
  }

  return `${baseUrl}?${params.toString()}`;
}
