import { describe, expect, it } from "vitest";

import { togglePayoffSign } from "../togglePayoffSign";

describe("togglePayoffSign", () => {
  it("adds or removes a leading minus sign", () => {
    expect(togglePayoffSign("150")).toBe("-150");
    expect(togglePayoffSign("-150")).toBe("150");
    expect(togglePayoffSign("+150")).toBe("-150");
    expect(togglePayoffSign("+")).toBe("-");
    expect(togglePayoffSign("")).toBe("-");
  });
});
