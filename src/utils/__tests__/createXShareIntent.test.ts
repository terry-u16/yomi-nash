import { describe, expect, it } from "vitest";

import { createXShareIntent } from "@/utils/createXShareIntent";

describe("createXShareIntent", () => {
  it("builds an X share intent URL with encoded text and URL", () => {
    const intent = createXShareIntent({
      text: "Yomi Nash | 格闘ゲームの読み合い分析アプリ #yominash",
      url: "https://example.com/ja?schemaVersion=1&gameInput=shared",
    });

    expect(intent).toBe(
      "https://x.com/intent/tweet?text=Yomi+Nash+%7C+%E6%A0%BC%E9%97%98%E3%82%B2%E3%83%BC%E3%83%A0%E3%81%AE%E8%AA%AD%E3%81%BF%E5%90%88%E3%81%84%E5%88%86%E6%9E%90%E3%82%A2%E3%83%97%E3%83%AA+%23yominash&url=https%3A%2F%2Fexample.com%2Fja%3FschemaVersion%3D1%26gameInput%3Dshared"
    );
  });
});
