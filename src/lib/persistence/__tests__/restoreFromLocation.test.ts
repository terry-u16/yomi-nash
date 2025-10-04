import { describe, expect, it } from "vitest";
import { restoreFromLocation } from "@/lib/persistence/restoreFromLocation";
import { encodeShareObject } from "@/utils/shareCodec";
import type { GameInputUI, GameResult } from "@/types/game";
import { DATA_SCHEMA_VERSION } from "@/constants/storage";

const validInput: GameInputUI = {
  strategyLabels1: ["A", "B"],
  strategyLabels2: ["X", "Y"],
  payoffMatrix: [
    ["1", "2"],
    ["3", "4"],
  ],
};

const validResult: GameResult = {
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

describe("restoreFromLocation", () => {
  it("returns none when no share data is present", () => {
    expect(restoreFromLocation(""))
      .toEqual({ status: "none" });
  });

  it("detects schema version mismatches", () => {
    const params = new URLSearchParams();
    params.set("schemaVersion", String(DATA_SCHEMA_VERSION + 1));
    params.set("gameInput", encodeShareObject(validInput));

    expect(restoreFromLocation(`?${params.toString()}`)).toEqual({
      status: "schema-version-mismatch",
    });
  });

  it("surfaces input decode errors", () => {
    const invalidInput = {
      strategyLabels1: ["A"],
      strategyLabels2: ["X"],
      payoffMatrix: [["1", "2"]],
    } satisfies GameInputUI;

    const params = new URLSearchParams();
    params.set("schemaVersion", String(DATA_SCHEMA_VERSION));
    params.set("gameInput", encodeShareObject(invalidInput));

    const outcome = restoreFromLocation(`?${params.toString()}`);
    expect(outcome.status).toBe("input-error");
    if (outcome.status === "input-error") {
      expect(outcome.message).toBe("表のサイズと行・列のラベル数が一致していません。");
    }
  });

  it("restores input when result is absent", () => {
    const params = new URLSearchParams();
    params.set("schemaVersion", String(DATA_SCHEMA_VERSION));
    params.set("gameInput", encodeShareObject(validInput));

    expect(restoreFromLocation(`?${params.toString()}`)).toEqual({
      status: "success",
      inputUI: validInput,
      result: null,
    });
  });

  it("restores input and result when both are valid", () => {
    const params = new URLSearchParams();
    params.set("schemaVersion", String(DATA_SCHEMA_VERSION));
    params.set("gameInput", encodeShareObject(validInput));
    params.set("gameResult", encodeShareObject(validResult));

    expect(restoreFromLocation(`?${params.toString()}`)).toEqual({
      status: "success",
      inputUI: validInput,
      result: validResult,
    });
  });

  it("returns a warning when the result cannot be decoded", () => {
    const invalidResult = {
      ...validResult,
      player1Strategy: [{ label: "Unknown", probability: 1 }],
    } satisfies GameResult;

    const params = new URLSearchParams();
    params.set("schemaVersion", String(DATA_SCHEMA_VERSION));
    params.set("gameInput", encodeShareObject(validInput));
    params.set("gameResult", encodeShareObject(invalidResult));

    const outcome = restoreFromLocation(`?${params.toString()}`);
    expect(outcome.status).toBe("success");
    if (outcome.status === "success") {
      expect(outcome.inputUI).toEqual(validInput);
      expect(outcome.result).toBeNull();
      expect(outcome.resultErrorMessage).toBe("不正なplayer1のラベル: Unknown");
    }
  });

  it("treats malformed input tokens as input errors", () => {
    const params = new URLSearchParams();
    params.set("gameInput", "not-encodable");

    const outcome = restoreFromLocation(`?${params.toString()}`);
    expect(outcome.status).toBe("input-error");
    if (outcome.status === "input-error") {
      expect(outcome.message).toBe("共有された入力データを復元できませんでした");
    }
  });
});
