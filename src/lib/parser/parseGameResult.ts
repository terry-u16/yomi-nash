import { z } from "zod";
import type { GameResult, GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeShareObject } from "@/utils/shareCodec";
import {
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

const SharedGameResultV2Schema = z.object({
  player1Probabilities: z.array(z.number().min(0).max(1)),
  player2Probabilities: z.array(z.number().min(0).max(1)),
});

export function decodeGameResult(
  raw: string | null,
  inputUI: GameInputUI
): Result<GameResult> | null {
  if (!raw) return null;

  const envelope = decodeShareObject<unknown>(raw);
  if (!envelope) {
    return { ok: false, error: "共有された結果データを復元できませんでした" };
  }

  if (!SUPPORTED_SHARE_SCHEMA_VERSIONS.includes(envelope.version)) {
    return {
      ok: false,
      error: "共有データのバージョンが現在のアプリと一致していません",
    };
  }

  try {
    if (envelope.version >= SHARE_SCHEMA_VERSION) {
      return decodeSharedGameResultV2(envelope.payload, inputUI);
    }

    const result = GameResultSchema.parse(envelope.payload);

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
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: message };
  }
}

function decodeSharedGameResultV2(
  payload: unknown,
  inputUI: GameInputUI
): Result<GameResult> {
  const probabilities = SharedGameResultV2Schema.parse(payload);

  if (
    probabilities.player1Probabilities.length !==
      inputUI.strategyLabels1.length ||
    probabilities.player2Probabilities.length !== inputUI.strategyLabels2.length
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
        probability: probabilities.player1Probabilities[index],
      })),
      player2Strategy: inputUI.strategyLabels2.map((label, index) => ({
        label,
        probability: probabilities.player2Probabilities[index],
      })),
      payoffMatrix: inputResult.data.payoffMatrix,
    },
  };
}
