import { DATA_SCHEMA_VERSION } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeGameInputUI } from "@/lib/parser/parseGameInputUI";
import { decodeGameResult } from "@/lib/parser/parseGameResult";

export type RestoreFromLocationOutcome =
  | { status: "none" }
  | { status: "schema-version-mismatch" }
  | { status: "input-error"; message: string }
  | {
      status: "success";
      inputUI: GameInputUI;
      result: GameResult | null;
      resultErrorMessage?: string;
    };

const INPUT_ERROR_FALLBACK = "入力の復元に失敗しました";
const RESULT_ERROR_FALLBACK = "結果の復元に失敗しました";

export function restoreFromLocation(search: string): RestoreFromLocationOutcome {
  const searchParams = new URLSearchParams(search);
  const versionParam = searchParams.get("schemaVersion");

  if (
    versionParam !== null &&
    Number.parseInt(versionParam, 10) !== DATA_SCHEMA_VERSION
  ) {
    return { status: "schema-version-mismatch" };
  }

  const rawInput = searchParams.get("gameInput");
  if (!rawInput) {
    return { status: "none" };
  }

  const inputResult = decodeGameInputUI(rawInput);
  if (!inputResult) {
    return { status: "none" };
  }

  if (!inputResult.ok) {
    return {
      status: "input-error",
      message: coerceMessage(inputResult, INPUT_ERROR_FALLBACK),
    };
  }

  const rawResult = searchParams.get("gameResult");
  if (!rawResult) {
    return {
      status: "success",
      inputUI: inputResult.data,
      result: null,
    };
  }

  const resultResult = decodeGameResult(rawResult, inputResult.data);
  if (!resultResult) {
    return {
      status: "success",
      inputUI: inputResult.data,
      result: null,
    };
  }

  if (!resultResult.ok) {
    return {
      status: "success",
      inputUI: inputResult.data,
      result: null,
      resultErrorMessage: coerceMessage(resultResult, RESULT_ERROR_FALLBACK),
    };
  }

  return {
    status: "success",
    inputUI: inputResult.data,
    result: resultResult.data,
  };
}

function coerceMessage<T>(result: Result<T>, fallback: string): string {
  if (result.ok) return fallback;
  if ("error" in result && result.error) {
    return result.error;
  }
  return fallback;
}
