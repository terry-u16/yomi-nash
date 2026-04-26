import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

export interface ShareEnvelopeV1<T> {
  version: typeof DATA_SCHEMA_VERSION;
  payload: T;
}

export function encodeShareObject<T>(obj: T): string {
  return compressToEncodedURIComponent(JSON.stringify(obj));
}

export function encodeLegacyShareObject<T>(obj: T): string {
  const envelope: ShareEnvelopeV1<T> = {
    version: DATA_SCHEMA_VERSION,
    payload: obj,
  };
  return compressToEncodedURIComponent(JSON.stringify(envelope));
}

export function decodeShareObject<T>(raw: string): T | null {
  try {
    const json = decompressFromEncodedURIComponent(raw);
    if (!json) return null;
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
