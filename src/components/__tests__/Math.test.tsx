import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BlockMath, InlineMath } from "@/components/Math";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe("Math", () => {
  it("renders inline TeX commands with KaTeX", () => {
    act(() => {
      root.render(<InlineMath math={String.raw`i = 1,\dots,m`} />);
    });

    expect(container.querySelector(".katex-html")?.textContent).toBe("i=1,…,m");
  });

  it("renders block TeX commands with KaTeX", () => {
    act(() => {
      root.render(
        <BlockMath math={String.raw`x_i \ge 0,\quad \sum_{i=1}^{m} x_i = 1`} />
      );
    });

    expect(container.querySelector(".katex-display")).not.toBeNull();
    expect(container.querySelector(".katex-html")?.textContent).toContain("≥");
    expect(container.querySelector(".katex-html")?.textContent).toContain("∑");
  });
});
