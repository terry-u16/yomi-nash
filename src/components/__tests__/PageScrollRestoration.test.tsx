import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const route = vi.hoisted(() => ({
  pathname: "/ja/help",
  search: "",
  hash: "",
}));

vi.mock("react-router-dom", () => ({
  useLocation: () => route,
}));

let container: HTMLDivElement;
let root: Root;
let scrollYValue = 0;
let rafCallbacks: FrameRequestCallback[] = [];

const renderScrollRestoration = async () => {
  await act(async () => {
    const PageScrollRestoration = (
      await import("@/components/PageScrollRestoration")
    ).default;
    root.render(<PageScrollRestoration />);
  });
};

const flushRaf = () => {
  const callbacks = rafCallbacks;
  rafCallbacks = [];
  callbacks.forEach((callback) => callback(performance.now()));
};

beforeEach(() => {
  vi.resetModules();
  route.pathname = "/ja/help";
  route.search = "";
  route.hash = "";
  scrollYValue = 0;
  rafCallbacks = [];

  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    get: () => scrollYValue,
  });
  Object.defineProperty(window.history, "scrollRestoration", {
    configurable: true,
    writable: true,
    value: "auto",
  });

  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    rafCallbacks.push(callback);
    return rafCallbacks.length;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
    rafCallbacks[id - 1] = () => undefined;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(
    (optionsOrX?: ScrollToOptions | number, y?: number) => {
      scrollYValue =
        typeof optionsOrX === "number" ? (y ?? 0) : (optionsOrX?.top ?? 0);
    }
  );
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
  vi.restoreAllMocks();
  Reflect.deleteProperty(window, "scrollY");
});

describe("PageScrollRestoration", () => {
  it("restores a page's own scroll position after visiting a shorter route", async () => {
    await renderScrollRestoration();
    flushRaf();

    scrollYValue = 3000;
    window.dispatchEvent(new Event("scroll"));

    route.pathname = "/ja";
    scrollYValue = 120;
    await renderScrollRestoration();
    flushRaf();
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    route.pathname = "/ja/help";
    await renderScrollRestoration();
    flushRaf();
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 3000,
      left: 0,
      behavior: "auto",
    });
  });

  it("skips restoration when the route includes a hash", async () => {
    await renderScrollRestoration();
    flushRaf();
    vi.mocked(window.scrollTo).mockClear();

    scrollYValue = 1800;
    window.dispatchEvent(new Event("scroll"));

    route.hash = "#tutorial";
    await renderScrollRestoration();
    flushRaf();

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
