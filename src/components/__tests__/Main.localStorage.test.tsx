import type { ReactNode } from "react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";

import { createMockLocalStorage } from "@/test/utils/createMockLocalStorage";
import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";
import { createDefaultGameInputUI } from "@/lib/presets";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

type MainOutletContext = {
  inputUI: GameInputUI;
  result: GameResult | null;
};

const capturedContexts: MainOutletContext[] = [];

vi.mock("@chakra-ui/react", () => ({
  Flex: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    Outlet: ({ context }: { context: unknown }) => {
      capturedContexts.push(context as MainOutletContext);
      return null;
    },
  };
});

let localStorageMock = createMockLocalStorage();

beforeEach(() => {
  localStorageMock = createMockLocalStorage();
  vi.stubGlobal("localStorage", localStorageMock);
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  capturedContexts.length = 0;
});

afterEach(() => {
  Reflect.deleteProperty(window, "localStorage");
  vi.unstubAllGlobals();
});

describe("Main localStorage restore", () => {
  const storedInputUI: GameInputUI = {
    strategyLabels1: ["A"],
    strategyLabels2: ["B"],
    payoffMatrix: [["1"]],
  };
  const storedResult: GameResult = {
    player1Strategy: [{ label: "A", probability: 1 }],
    player2Strategy: [{ label: "B", probability: 1 }],
    payoffMatrix: [[1]],
  };

  const renderMain = async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      const Main = (await import("@/components/Main")).default;
      root.render(<Main maxWidth="lg" />);
    });

    act(() => {
      root.unmount();
    });
    container.remove();
  };

  it("restores input and result when schema version matches", async () => {
    localStorage.setItem(
      STORAGE_KEYS.inputUI,
      JSON.stringify({ version: DATA_SCHEMA_VERSION, payload: storedInputUI })
    );
    localStorage.setItem(
      STORAGE_KEYS.result,
      JSON.stringify({ version: DATA_SCHEMA_VERSION, payload: storedResult })
    );
    localStorageMock.setItem.mockClear();

    await renderMain();

    expect(capturedContexts).toHaveLength(1);
    const context = capturedContexts[0];

    expect(context.inputUI).toEqual(storedInputUI);
    expect(context.result).toEqual(storedResult);
  });

  it("falls back to presets when nothing is stored", async () => {
    await renderMain();

    expect(capturedContexts).toHaveLength(1);
    const context = capturedContexts[0];

    expect(context.inputUI).toEqual(createDefaultGameInputUI());
    expect(context.result).toBeNull();
  });

  it("ignores malformed stored data", async () => {
    localStorage.setItem(STORAGE_KEYS.inputUI, "not json");
    localStorage.setItem(
      STORAGE_KEYS.result,
      JSON.stringify({ version: DATA_SCHEMA_VERSION + 1, payload: storedResult })
    );
    localStorageMock.setItem.mockClear();

    await renderMain();

    expect(capturedContexts).toHaveLength(1);
    const context = capturedContexts[0];

    expect(context.inputUI).toEqual(createDefaultGameInputUI());
    expect(context.result).toBeNull();
  });
});
