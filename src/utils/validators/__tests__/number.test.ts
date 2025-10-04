import { describe, expect, it } from "vitest";
import { isValidNumber } from "@/utils/validators/number";

describe("isValidNumber", () => {
  it("accepts finite numeric strings", () => {
    expect(isValidNumber("0"))
      .toBe(true);
    expect(isValidNumber("-3.14"))
      .toBe(true);
    expect(isValidNumber("42"))
      .toBe(true);
  });

  it("rejects empty or non-numeric strings", () => {
    expect(isValidNumber(""))
      .toBe(false);
    expect(isValidNumber("abc"))
      .toBe(false);
  });

  it("rejects infinite values", () => {
    expect(isValidNumber("Infinity"))
      .toBe(false);
    expect(isValidNumber("-Infinity"))
      .toBe(false);
  });
});
