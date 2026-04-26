import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createMockLocalStorage } from "@/test/utils/createMockLocalStorage";

type SupportedLanguage = "ja" | "en";

const languageStorageKey = "yomi-nash.language";

let localStorageMock = createMockLocalStorage();

const setBrowserLanguages = (languages: string[], language = languages[0]) => {
  vi.spyOn(window.navigator, "languages", "get").mockReturnValue(languages);
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(language ?? "");
};

const importFreshI18n = async () => {
  vi.resetModules();
  const module = await import("@/lib/i18n");
  await new Promise<void>((resolve) => {
    queueMicrotask(() => resolve());
  });
  return module.default;
};

const expectInitialLanguage = async (expected: SupportedLanguage) => {
  const i18n = await importFreshI18n();
  expect(i18n.language).toBe(expected);
  expect(document.documentElement.lang).toBe(expected);
};

beforeEach(() => {
  localStorageMock = createMockLocalStorage();
  vi.stubGlobal("localStorage", localStorageMock);
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  window.history.pushState({}, "", "/");
  document.documentElement.lang = "";
});

afterEach(() => {
  Reflect.deleteProperty(window, "localStorage");
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("i18n initial language", () => {
  it("uses Japanese when the browser prefers Japanese", async () => {
    setBrowserLanguages(["ja-JP", "en-US"]);

    await expectInitialLanguage("ja");
  });

  it("uses English when the browser prefers English", async () => {
    setBrowserLanguages(["en-US", "ja-JP"]);

    await expectInitialLanguage("en");
  });

  it("falls back to English for unsupported browser languages", async () => {
    setBrowserLanguages(["fr-FR", "de-DE"]);

    await expectInitialLanguage("en");
  });

  it("keeps stored language preference ahead of browser languages", async () => {
    localStorage.setItem(languageStorageKey, "ja");
    setBrowserLanguages(["en-US"]);

    await expectInitialLanguage("ja");
  });

  it("keeps URL language ahead of browser languages", async () => {
    window.history.pushState({}, "", "/ja/help");
    setBrowserLanguages(["en-US"]);

    await expectInitialLanguage("ja");
  });
});
