import type { Dispatch, ReactNode, SetStateAction } from "react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

import { createMockLocalStorage } from "@/test/utils/createMockLocalStorage";
import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";

type LayoutContext = {
  inputUI: GameInputUI;
  setInputUI: Dispatch<SetStateAction<GameInputUI>>;
  result: GameResult | null;
  setResult: Dispatch<SetStateAction<GameResult | null>>;
};

const mockOutletContext = vi.fn<[], LayoutContext>(() => {
  throw new Error("mockOutletContext not configured");
});
const toasterCreate = vi.fn();

vi.mock("@chakra-ui/react", () => ({
  Stack: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/pages/Home/PayoffTable/PayoffTable", () => ({
  default: () => null,
}));

vi.mock("@/pages/Home/ResultDisplay/ResultDisplay", () => ({
  default: () => null,
}));

vi.mock("@/pages/Home/TableControls/TableControls", () => ({
  default: () => null,
}));

vi.mock("@/components/ui/toaster", () => ({
  toaster: { create: toasterCreate },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useOutletContext: () => mockOutletContext(),
  };
});

let localStorageMock = createMockLocalStorage();

const renderHome = async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    const Home = (await import("@/pages/Home")).default;
    root.render(<Home />);
  });

  root.unmount();
  container.remove();
};

beforeEach(() => {
  localStorageMock = createMockLocalStorage();
  vi.stubGlobal("localStorage", localStorageMock);
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  mockOutletContext.mockClear();
  mockOutletContext.mockImplementation(() => {
    throw new Error("mockOutletContext not configured");
  });
  toasterCreate.mockReset();
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  delete (window as Record<string, unknown>).localStorage;
  vi.unstubAllGlobals();
});

describe("Home localStorage persistence", () => {
  const sampleInputUI: GameInputUI = {
    strategyLabels1: ["A", "B"],
    strategyLabels2: ["X", "Y"],
    payoffMatrix: [
      ["1", "2"],
      ["3", "4"],
    ],
  };

  const sampleResult: GameResult = {
    player1Strategy: [
      { label: "A", probability: 0.5 },
      { label: "B", probability: 0.5 },
    ],
    player2Strategy: [
      { label: "X", probability: 0.25 },
      { label: "Y", probability: 0.75 },
    ],
    payoffMatrix: [
      [1, 2],
      [3, 4],
    ],
  };

  it("stores input and result whenever they change", async () => {
    mockOutletContext.mockReturnValue({
      inputUI: sampleInputUI,
      setInputUI: vi.fn(),
      result: sampleResult,
      setResult: vi.fn(),
    });

    await renderHome();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.inputUI,
      expect.any(String)
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.result,
      expect.any(String)
    );
    expect(localStorageMock.removeItem).not.toHaveBeenCalled();

    const storedInput = localStorageMock.store.get(STORAGE_KEYS.inputUI);
    expect(storedInput).toBeDefined();
    const envelopeInput = JSON.parse(storedInput!);
    expect(envelopeInput).toEqual({
      version: DATA_SCHEMA_VERSION,
      payload: sampleInputUI,
    });

    const storedResult = localStorageMock.store.get(STORAGE_KEYS.result);
    expect(storedResult).toBeDefined();
    const envelopeResult = JSON.parse(storedResult!);
    expect(envelopeResult).toEqual({
      version: DATA_SCHEMA_VERSION,
      payload: sampleResult,
    });
  });

  it("removes result when it becomes null", async () => {
    mockOutletContext.mockReturnValue({
      inputUI: sampleInputUI,
      setInputUI: vi.fn(),
      result: null,
      setResult: vi.fn(),
    });

    await renderHome();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.inputUI,
      expect.any(String)
    );
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.result
    );
    expect(localStorageMock.store.has(STORAGE_KEYS.result)).toBe(false);
  });
});
