import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { deflateSync, inflateSync, strFromU8, strToU8 } from "fflate";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

export interface ShareEnvelopeV1<T> {
  version: typeof DATA_SCHEMA_VERSION;
  payload: T;
}

export function encodeShareObject<T>(obj: T): string {
  const compressed = deflateSync(strToU8(JSON.stringify(obj)), { level: 6 });
  return bytesToBase64Url(compressed);
}

export function encodeLegacyShareObject<T>(obj: T): string {
  const envelope: ShareEnvelopeV1<T> = {
    version: DATA_SCHEMA_VERSION,
    payload: obj,
  };
  return compressToEncodedURIComponent(JSON.stringify(envelope));
}

export function decodeShareObject<T>(raw: string): T | null {
  const json = decodeDeflatedJson(raw);
  if (!json) return null;

  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function decodeLegacyShareObject<T>(
  raw: string
): ShareEnvelopeV1<T> | null {
  const json = decodeLegacyJson(raw);
  if (!json) return null;

  try {
    return JSON.parse(json) as ShareEnvelopeV1<T>;
  } catch {
    return null;
  }
}

function decodeDeflatedJson(raw: string): string | null {
  try {
    return strFromU8(inflateSync(base64UrlToBytes(raw)));
  } catch {
    return null;
  }
}

function decodeLegacyJson(raw: string): string | null {
  try {
    return decompressFromEncodedURIComponent(raw);
  } catch {
    return null;
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
