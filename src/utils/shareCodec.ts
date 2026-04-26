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
    const parsed = JSON.parse(json) as unknown;
    if (!isShareEnvelopeV1<T>(parsed)) {
      return null;
    }
    return parsed;
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

function isShareEnvelopeV1<T>(value: unknown): value is ShareEnvelopeV1<T> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    record.version === DATA_SCHEMA_VERSION &&
    Object.prototype.hasOwnProperty.call(record, "payload")
  );
}

type RuntimeBuffer = {
  from(data: Uint8Array): { toString(encoding: "base64"): string };
  from(data: string, encoding: "base64"): Uint8Array;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  const runtimeBuffer = getRuntimeBuffer();
  const base64 = runtimeBuffer
    ? runtimeBuffer.from(bytes).toString("base64")
    : bytesToBrowserBase64(bytes);

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const runtimeBuffer = getRuntimeBuffer();
  if (runtimeBuffer) {
    return Uint8Array.from(runtimeBuffer.from(padded, "base64"));
  }

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function getRuntimeBuffer(): RuntimeBuffer | undefined {
  return (globalThis as typeof globalThis & { Buffer?: RuntimeBuffer }).Buffer;
}

function bytesToBrowserBase64(bytes: Uint8Array): string {
  const chunkSize = 0x8000;
  const chunks: string[] = [];

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    chunks.push(
      String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
    );
  }

  return btoa(chunks.join(""));
}
