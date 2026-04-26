import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const route = vi.hoisted(() => ({
  pathname: "/ja/help",
  search: "?schemaVersion=1&gameInput=shared",
}));

vi.mock("react-router-dom", () => ({
  useLocation: () => route,
}));

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-i18next")>();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

let container: HTMLDivElement;
let root: Root;

const renderSeoLinks = async () => {
  await act(async () => {
    const SeoLinks = (await import("@/components/SeoLinks")).default;
    root.render(<SeoLinks currentLanguage="ja" />);
  });
};

const getLink = (rel: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  return document.head.querySelector(selector) as HTMLLinkElement | null;
};

const getMeta = (property: string) => {
  return document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;
};

beforeEach(() => {
  vi.resetModules();
  route.pathname = "/ja/help";
  route.search = "?schemaVersion=1&gameInput=shared";
  document.head
    .querySelectorAll("[data-yomi-seo-link], [data-yomi-seo-meta]")
    .forEach((node) => node.remove());

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

describe("SeoLinks", () => {
  it("omits share query parameters from canonical, alternate, and og:url links", async () => {
    await renderSeoLinks();

    expect(getLink("canonical")?.href).toBe("http://localhost:3000/ja/help");
    expect(getMeta("og:url")?.content).toBe("http://localhost:3000/ja/help");
    expect(getLink("alternate", "ja")?.href).toBe(
      "http://localhost:3000/ja/help"
    );
    expect(getLink("alternate", "en")?.href).toBe(
      "http://localhost:3000/en/help"
    );
    expect(getLink("alternate", "x-default")?.href).toBe(
      "http://localhost:3000/en/help"
    );
  });
});
