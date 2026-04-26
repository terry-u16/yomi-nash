export interface CreateXShareIntentOptions {
  text: string;
  url: string;
}

export function createXShareIntent({
  text,
  url,
}: CreateXShareIntentOptions): string {
  const params = new URLSearchParams();
  params.set("text", text);
  params.set("url", url);

  return `https://x.com/intent/tweet?${params.toString()}`;
}
