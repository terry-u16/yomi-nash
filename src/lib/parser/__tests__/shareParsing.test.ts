import { describe, expect, it } from "vitest";
import { encodeShareObject } from "@/utils/shareCodec";
import { decodeGameInputUI } from "@/lib/parser/parseGameInputUI";
import { decodeGameResult } from "@/lib/parser/parseGameResult";
import type { GameInputUI, GameResult } from "@/types/game";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";
import { compressToEncodedURIComponent } from "lz-string";

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

describe("share encoding", () => {
  it("encodes data with version envelope", () => {
    const token = encodeShareObject(sampleInputUI);
    const parsed = decodeGameInputUI(token);
    expect(parsed).not.toBeNull();
    if (!parsed) return;
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.data).toEqual(sampleInputUI);
  });

  it("rejects mismatched schema version for input", () => {
    const envelope = {
      version: DATA_SCHEMA_VERSION + 1,
      payload: sampleInputUI,
    } as const;
    const token = compressToEncodedURIComponent(JSON.stringify(envelope));
    const parsed = decodeGameInputUI(token);

    expect(parsed).not.toBeNull();
    if (!parsed) return;
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.error).toContain("バージョン");
  });

  it("parses a valid game result", () => {
    const token = encodeShareObject(sampleResult);
    const parsed = decodeGameResult(token, sampleInputUI);

    expect(parsed).not.toBeNull();
    if (!parsed) return;
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.data).toEqual(sampleResult);
  });

  it("rejects result with unknown labels", () => {
    const invalidResult: GameResult = {
      ...sampleResult,
      player1Strategy: [{ label: "Z", probability: 1 }],
    };
    const envelope = {
      version: DATA_SCHEMA_VERSION,
      payload: invalidResult,
    } as const;
    const token = compressToEncodedURIComponent(JSON.stringify(envelope));
    const parsed = decodeGameResult(token, sampleInputUI);

    expect(parsed).not.toBeNull();
    if (!parsed) return;
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.error).toContain("不正なplayer1");
  });
});
