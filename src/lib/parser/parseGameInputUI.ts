import { z } from "zod";
import type { GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeShareObject } from "@/utils/shareCodec";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

export const GameInputUISchema = z.object({
  strategyLabels1: z.array(z.string()).min(1),
  strategyLabels2: z.array(z.string()).min(1),
  payoffMatrix: z.array(z.array(z.string()).min(1)).min(1),
});

export function decodeGameInputUI(
  raw: string | null
): Result<GameInputUI> | null {
  if (!raw) return null;

  const envelope = decodeShareObject<GameInputUI>(raw);
  if (!envelope) {
    return { ok: false, error: "共有された入力データを復元できませんでした" };
  }

  if (envelope.version !== DATA_SCHEMA_VERSION) {
    return {
      ok: false,
      error: "共有データのバージョンが現在のアプリと一致していません",
    };
  }

  try {
    const input = GameInputUISchema.parse(envelope.payload);

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
