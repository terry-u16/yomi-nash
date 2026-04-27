import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const i18nState = vi.hoisted(() => ({
  language: "ja",
}));

vi.mock("@/lib/i18n", () => ({
  defaultLanguage: "en",
  supportedLanguages: ["ja", "en"],
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: i18nState.language,
      resolvedLanguage: i18nState.language,
      changeLanguage: vi.fn((language: string) => {
        i18nState.language = language;
        return Promise.resolve();
      }),
    },
  }),
}));

vi.mock("./components/Layout", () => ({
  default: () => null,
}));

vi.mock("./components/SeoLinks", () => ({
  default: () => null,
}));

vi.mock("./components/FirstVisitHelpToast", () => ({
  default: () => null,
}));

vi.mock("./components/PageScrollRestoration", () => ({
  default: () => null,
}));

let container: HTMLDivElement;
let root: Root;
const visitedLocations: string[] = [];

const LocationRecorder = () => {
  const location = useLocation();
  visitedLocations.push(
    `${location.pathname}${location.search}${location.hash}`
  );
  return null;
};

const renderApp = async (initialEntry: string) => {
  await act(async () => {
    const App = (await import("@/App")).default;
    root.render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <App />
        <LocationRecorder />
      </MemoryRouter>
    );
  });
};

beforeEach(() => {
  vi.resetModules();
  i18nState.language = "ja";
  visitedLocations.length = 0;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe("App routing", () => {
  it("preserves share query parameters when redirecting root links to Japanese", async () => {
    await renderApp("/?schemaVersion=1&gameInput=shared#result");

    expect(visitedLocations[visitedLocations.length - 1]).toBe(
      "/ja?schemaVersion=1&gameInput=shared#result"
    );
  });

  it("preserves share query parameters when redirecting root links to English", async () => {
    i18nState.language = "en";

    await renderApp("/?schemaVersion=1&gameInput=shared#result");

    expect(visitedLocations[visitedLocations.length - 1]).toBe(
      "/en?schemaVersion=1&gameInput=shared#result"
    );
  });
});
