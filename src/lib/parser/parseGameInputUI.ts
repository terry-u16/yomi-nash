import { z } from "zod";
import type { GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeShareObject } from "@/utils/shareCodec";

const GameInputUISchema = z.object({
  strategyLabels1: z.array(z.string()).min(1),
  strategyLabels2: z.array(z.string()).min(1),
  payoffMatrix: z.array(z.array(z.string()).min(1)).min(1),
});

export function parseGameInputUIFromSearchParams(
  searchParams: URLSearchParams
): Result<GameInputUI> | null {
  const raw = searchParams.get("gameInputUI");
  if (!raw) return null;

  const decoded = decodeShareObject<GameInputUI>(raw);
  if (!decoded) {
    return { ok: false, error: "共有された入力データを復元できませんでした" };
  }

  try {
    const input = GameInputUISchema.parse(decoded);

    // バリデーション：行列のサイズがラベル数と一致
    const rows = input.payoffMatrix.length;
    const cols = input.payoffMatrix.map((row) => row.length);

    if (
      rows !== input.strategyLabels1.length ||
      cols.some((len) => len !== input.strategyLabels2.length)
    ) {
      return {
        ok: false,
        error: "表のサイズと行・列のラベル数が一致していません。",
      };
    }

    return { ok: true, data: input };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: message };
  }
}
