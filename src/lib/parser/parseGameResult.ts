import { z } from "zod";
import type { GameResult, GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeLegacyShareObject, decodeShareObject } from "@/utils/shareCodec";
import {
  DATA_SCHEMA_VERSION,
  SHARE_SCHEMA_VERSION,
  SUPPORTED_SHARE_SCHEMA_VERSIONS,
} from "@/constants/storage";
import { parseGameInputUI } from "@/utils/parseGameInput";

const MixedStrategyEntrySchema = z.object({
  label: z.string(),
  probability: z.number().min(0).max(1),
});

export const GameResultSchema = z.object({
  player1Strategy: z.array(MixedStrategyEntrySchema),
  player2Strategy: z.array(MixedStrategyEntrySchema),
  payoffMatrix: z.array(z.array(z.number())),
});

const SharedGameResultV2Schema = z.tuple([
  z.array(z.number().min(0).max(1)),
  z.array(z.number().min(0).max(1)),
]);

export function decodeGameResult(
  raw: string | null,
  inputUI: GameInputUI,
  version: number = SHARE_SCHEMA_VERSION
): Result<GameResult> | null {
  if (!raw) return null;
  if (!SUPPORTED_SHARE_SCHEMA_VERSIONS.includes(version)) {
    return {
      ok: false,
      error: "共有データのバージョンが現在のアプリと一致していません",
    };
  }

  try {
    switch (version) {
      case DATA_SCHEMA_VERSION: {
        const envelope = decodeLegacyShareObject<unknown>(raw);
        if (!envelope || envelope.version !== DATA_SCHEMA_VERSION) {
          return {
            ok: false,
            error: "共有された結果データを復元できませんでした",
          };
        }
        return decodeLegacyGameResult(envelope.payload, inputUI);
      }
      case SHARE_SCHEMA_VERSION: {
        const payload = decodeShareObject<unknown>(raw);
        if (payload === null) {
          return {
            ok: false,
            error: "共有された結果データを復元できませんでした",
          };
        }
        return decodeSharedGameResultV2(payload, inputUI);
      }
      default:
        return {
          ok: false,
          error: "共有データのバージョンが現在のアプリと一致していません",
        };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: message };
  }
}

function decodeLegacyGameResult(
  payload: unknown,
  inputUI: GameInputUI
): Result<GameResult> {
  const result = GameResultSchema.parse(payload);

  // バリデーション：ラベルの一致
  const labels1 = new Set(inputUI.strategyLabels1);
  const labels2 = new Set(inputUI.strategyLabels2);

  for (const { label } of result.player1Strategy) {
    if (!labels1.has(label)) {
      return { ok: false, error: `不正なplayer1のラベル: ${label}` };
    }
  }

  for (const { label } of result.player2Strategy) {
    if (!labels2.has(label)) {
      return { ok: false, error: `不正なplayer2のラベル: ${label}` };
    }
  }

  // バリデーション：payoffMatrixのサイズ
  if (
    result.payoffMatrix.length !== inputUI.strategyLabels1.length ||
    result.payoffMatrix[0]?.length !== inputUI.strategyLabels2.length
  ) {
    return {
      ok: false,
      error: "GameResultのpayoffMatrixのサイズがGameInputUIと一致しません",
    };
  }

  return { ok: true, data: result };
}

function decodeSharedGameResultV2(
  payload: unknown,
  inputUI: GameInputUI
): Result<GameResult> {
  const [player1Probabilities, player2Probabilities] =
    SharedGameResultV2Schema.parse(payload);

  if (
    player1Probabilities.length !== inputUI.strategyLabels1.length ||
    player2Probabilities.length !== inputUI.strategyLabels2.length
  ) {
    return {
      ok: false,
      error: "共有された確率の数が行・列のラベル数と一致していません",
    };
  }

  const inputResult = parseGameInputUI(inputUI);
  if (!inputResult.ok) {
    return {
      ok: false,
      error: "共有された入力データから利得行列を復元できませんでした",
    };
  }

  return {
    ok: true,
    data: {
      player1Strategy: inputUI.strategyLabels1.map((label, index) => ({
        label,
        probability: player1Probabilities[index],
      })),
      player2Strategy: inputUI.strategyLabels2.map((label, index) => ({
        label,
        probability: player2Probabilities[index],
      })),
      payoffMatrix: inputResult.data.payoffMatrix,
    },
  };
}
