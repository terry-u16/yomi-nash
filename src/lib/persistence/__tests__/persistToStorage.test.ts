import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { persistToStorage } from "@/lib/persistence/persistToStorage";
import { createMockLocalStorage } from "@/test/utils/createMockLocalStorage";
import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";

const sampleInput: GameInputUI = {
  strategyLabels1: ["A"],
  strategyLabels2: ["X"],
  payoffMatrix: [["1"]],
};

const sampleResult: GameResult = {
  player1Strategy: [{ label: "A", probability: 1 }],
  player2Strategy: [{ label: "X", probability: 1 }],
  payoffMatrix: [[1]],
};

let localStorageMock = createMockLocalStorage();

beforeEach(() => {
  localStorageMock = createMockLocalStorage();
  vi.stubGlobal("localStorage", localStorageMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("persistToStorage", () => {
  it("stores both input and result when present", () => {
    persistToStorage({ inputUI: sampleInput, result: sampleResult });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.inputUI,
      JSON.stringify({
        version: DATA_SCHEMA_VERSION,
        payload: sampleInput,
      })
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.result,
      JSON.stringify({
        version: DATA_SCHEMA_VERSION,
        payload: sampleResult,
      })
    );
  });

  it("removes stored result when result is null", () => {
    persistToStorage({ inputUI: sampleInput, result: null });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.result
    );
    expect(localStorageMock.store.has(STORAGE_KEYS.result)).toBe(false);
  });

  it("swallows storage errors gracefully", () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(() =>
      persistToStorage({ inputUI: sampleInput, result: sampleResult })
    ).not.toThrow();

    expect(warnSpy).toHaveBeenCalledWith(
      "Failed to save to localStorage",
      expect.any(Error)
    );

    warnSpy.mockRestore();
  });
});
