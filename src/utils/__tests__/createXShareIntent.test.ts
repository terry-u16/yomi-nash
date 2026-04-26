import { describe, expect, it } from "vitest";

import { createXShareIntent } from "@/utils/createXShareIntent";

describe("createXShareIntent", () => {
  it("builds an X share intent URL with encoded text and URL", () => {
    const text = "Yomi Nash | 格闘ゲームの読み合い分析アプリ #yominash";
    const url = "https://example.com/ja?schemaVersion=1&gameInput=shared";
    const intent = createXShareIntent({
      text,
      url,
    });
    const parsedIntent = new URL(intent);

    expect(parsedIntent.origin).toBe("https://x.com");
    expect(parsedIntent.pathname).toBe("/intent/tweet");
    expect(parsedIntent.searchParams.get("text")).toBe(text);
    expect(parsedIntent.searchParams.get("url")).toBe(url);
  });
});
