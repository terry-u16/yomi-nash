import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

// 型安全のためジェネリック
export function encodeShareObject<T>(obj: T): string {
  return compressToEncodedURIComponent(JSON.stringify(obj));
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
