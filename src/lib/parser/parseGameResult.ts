import { z } from "zod";
import type { GameResult, GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeShareObject } from "@/utils/shareCodec";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

const MixedStrategyEntrySchema = z.object({
  label: z.string(),
  probability: z.number().min(0).max(1),
});

export const GameResultSchema = z.object({
  player1Strategy: z.array(MixedStrategyEntrySchema),
  player2Strategy: z.array(MixedStrategyEntrySchema),
  payoffMatrix: z.array(z.array(z.number())),
});

export function decodeGameResult(
  raw: string | null,
  inputUI: GameInputUI
): Result<GameResult> | null {
  if (!raw) return null;

  const envelope = decodeShareObject<GameResult>(raw);
  if (!envelope) {
    return { ok: false, error: "共有された結果データを復元できませんでした" };
  }

  if (envelope.version !== DATA_SCHEMA_VERSION) {
    return {
      ok: false,
      error: "共有データのバージョンが現在のアプリと一致していません",
    };
  }

  try {
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
