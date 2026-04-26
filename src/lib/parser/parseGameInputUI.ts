import { z } from "zod";
import type { GameInputUI } from "@/types/game";
import type { Result } from "@/types/result";
import { decodeShareObject, type ShareEnvelopeV1 } from "@/utils/shareCodec";
import {
  DATA_SCHEMA_VERSION,
  SHARE_SCHEMA_VERSION,
  SUPPORTED_SHARE_SCHEMA_VERSIONS,
} from "@/constants/storage";

export const GameInputUISchema = z.object({
  strategyLabels1: z.array(z.string()).min(1),
  strategyLabels2: z.array(z.string()).min(1),
  payoffMatrix: z.array(z.array(z.string()).min(1)).min(1),
});

const SharedGameInputV2Schema = z.object({
  r: z.array(z.string()).min(1),
  c: z.array(z.string()).min(1),
  m: z.array(z.number()),
});

export function decodeGameInputUI(
  raw: string | null,
  version: number = SHARE_SCHEMA_VERSION
): Result<GameInputUI> | null {
  if (!raw) return null;
  if (!SUPPORTED_SHARE_SCHEMA_VERSIONS.includes(version)) {
    return {
      ok: false,
      error: "共有データのバージョンが現在のアプリと一致していません",
    };
  }

  try {
    const input = decodeVersionedGameInputUI(raw, version);
    if (!input) {
      return {
        ok: false,
        error: "共有された入力データを復元できませんでした",
      };
    }

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

function decodeVersionedGameInputUI(
  raw: string,
  version: number
): GameInputUI | null {
  switch (version) {
    case DATA_SCHEMA_VERSION: {
      const envelope = decodeShareObject<ShareEnvelopeV1<unknown>>(raw);
      if (!envelope || envelope.version !== DATA_SCHEMA_VERSION) {
        return null;
      }
      return GameInputUISchema.parse(envelope.payload);
    }
    case SHARE_SCHEMA_VERSION: {
      const payload = decodeShareObject<unknown>(raw);
      if (payload === null) {
        return null;
      }
      return decodeSharedGameInputV2(payload);
    }
    default:
      return null;
  }
}

function decodeSharedGameInputV2(payload: unknown): GameInputUI {
  const input = SharedGameInputV2Schema.parse(payload);
  const rowCount = input.r.length;
  const colCount = input.c.length;

  if (input.m.length !== rowCount * colCount) {
    throw new Error("利得行列の要素数が行・列のラベル数と一致していません。");
  }

  return {
    strategyLabels1: input.r,
    strategyLabels2: input.c,
    payoffMatrix: Array.from({ length: rowCount }, (_, rowIndex) =>
      input.m
        .slice(rowIndex * colCount, (rowIndex + 1) * colCount)
        .map((value) => String(value))
    ),
  };
}
