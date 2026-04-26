import { describe, expect, it } from "vitest";
import { createShareUrl } from "@/utils/createShareUrl";
import type { GameInputUI, GameResult } from "@/types/game";
import { SHARE_SCHEMA_VERSION } from "@/constants/storage";
import { decodeShareObject } from "@/utils/shareCodec";

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
  it("uses the origin without a language path by default", () => {
    window.history.pushState({}, "", "/ja/help?foo=bar");

    const url = createShareUrl(sampleInput);
    const parsedUrl = new URL(url);

    expect(parsedUrl.origin).toBe(window.location.origin);
    expect(parsedUrl.pathname).toBe("/");
    expect(parsedUrl.searchParams.get("schemaVersion")).toBe(
      String(SHARE_SCHEMA_VERSION)
    );
    expect(parsedUrl.searchParams.get("i")).toBeTruthy();
  });

  it("encodes the schema version and game input", () => {
    const url = createShareUrl(sampleInput, { baseUrl: "https://example.com" });
    const params = new URL(url).searchParams;

    expect(params.get("schemaVersion")).toBe(String(SHARE_SCHEMA_VERSION));
    expect(params.get("i")).toBeTruthy();
    expect(params.get("gameInput")).toBeNull();
    expect(params.get("r")).toBeNull();
  });

  it("includes compact input and result payloads when provided", () => {
    const url = createShareUrl(sampleInput, {
      baseUrl: "https://example.com/app",
      result: sampleResult,
    });
    const params = new URL(url).searchParams;
    const rawInput = params.get("i");
    const rawResult = params.get("r");

    expect(rawInput).toBeTruthy();
    expect(rawResult).toBeTruthy();
    if (!rawInput || !rawResult) return;
    expect(decodeShareObject(rawInput)).toEqual({
      r: ["A", "B"],
      c: ["X", "Y"],
      m: [1, 2, 3, 4],
    });
    expect(decodeShareObject(rawResult)).toEqual({
      p: [0.5, 0.5],
      q: [0.25, 0.75],
    });
  });

  it("omits the game result when null is passed", () => {
    const url = createShareUrl(sampleInput, {
      baseUrl: "https://example.com",
      result: null,
    });
    const params = new URL(url).searchParams;

    expect(params.get("r")).toBeNull();
  });
});
