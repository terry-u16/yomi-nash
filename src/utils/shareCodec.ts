import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

export interface ShareEnvelope<T> {
  version: number;
  payload: T;
}

// 型安全のためジェネリック
export function encodeShareObject<T>(obj: T): string {
  const envelope: ShareEnvelope<T> = {
    version: DATA_SCHEMA_VERSION,
    payload: obj,
  };
  return compressToEncodedURIComponent(JSON.stringify(envelope));
}

export function decodeShareObject<T>(raw: string): ShareEnvelope<T> | null {
  try {
    const json = decompressFromEncodedURIComponent(raw);
    if (!json) return null;
    const parsed = JSON.parse(json) as Partial<ShareEnvelope<T>>;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.version !== "number" ||
      !("payload" in parsed)
    ) {
      return null;
    }
    return parsed as ShareEnvelope<T>;
  } catch {
    return null;
  }
}
