import { describe, expect, it } from "vitest";
import { createShareUrl } from "@/utils/createShareUrl";
import type { GameInputUI, GameResult } from "@/types/game";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

const sampleInput: GameInputUI = {
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

describe("createShareUrl", () => {
  it("encodes the schema version and game input", () => {
    const url = createShareUrl(sampleInput, { baseUrl: "https://example.com" });
    const params = new URL(url).searchParams;

    expect(params.get("schemaVersion")).toBe(String(DATA_SCHEMA_VERSION));
    expect(params.get("gameInput")).toBeTruthy();
    expect(params.get("gameResult")).toBeNull();
  });

  it("includes the encoded game result when provided", () => {
    const url = createShareUrl(sampleInput, {
      baseUrl: "https://example.com/app",
      result: sampleResult,
    });
    const params = new URL(url).searchParams;

    expect(params.get("gameResult")).toBeTruthy();
  });

  it("omits the game result when null is passed", () => {
    const url = createShareUrl(sampleInput, {
      baseUrl: "https://example.com",
      result: null,
    });
    const params = new URL(url).searchParams;

    expect(params.get("gameResult")).toBeNull();
  });
});
