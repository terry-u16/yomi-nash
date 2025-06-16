import { z } from "zod";
import type { GameResult, GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";

const MixedStrategyEntrySchema = z.object({
  label: z.string(),
  probability: z.number().min(0).max(1),
});

const GameResultSchema = z.object({
  player1Strategy: z.array(MixedStrategyEntrySchema),
  player2Strategy: z.array(MixedStrategyEntrySchema),
  payoffMatrix: z.array(z.array(z.number())),
});

export function parseGameResultFromSearchParams(
  searchParams: URLSearchParams,
  inputUI: GameInputUI
): Result<GameResult> | null {
  const raw = searchParams.get("gameResult");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const result = GameResultSchema.parse(parsed);

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
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? "GameResultのパースに失敗しました",
    };
  }
}
