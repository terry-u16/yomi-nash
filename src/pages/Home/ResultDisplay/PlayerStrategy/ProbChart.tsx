import type { MixedStrategy } from "@/types/game";
import { useToken } from "@chakra-ui/react";
import React from "react";
import { BarSegment, useChart } from "@chakra-ui/charts";
import chroma from "chroma-js";

interface Props {
  strategy: MixedStrategy;
  colorpalette: string;
}

function getChroma(
  count: number,
  colors: string[]
): chroma.Scale<chroma.Color> {
  if (count === 1) {
    return chroma.scale(colors.slice(0, 1));
  } else if (count === 2) {
    return chroma.scale(colors.slice(0, 2)).domain([0, 1]);
  } else if (count === 3) {
    return chroma.scale(colors.slice(0, 3)).domain([0, 0.5, 1]);
  } else {
    return chroma.scale(colors).domain([0, 1 / 3, 2 / 3, 1]);
  }
}

const ProbChart: React.FC<Props> = React.memo(
  ({ strategy, colorpalette }: Props) => {
    const colors = useToken("colors", [
      `${colorpalette}.600`,
      `${colorpalette}.500`,
      `${colorpalette}.400`,
      `${colorpalette}.300`,
    ]);
    const scale = getChroma(strategy.length, colors);
    const data = strategy.map((entry, idx) => ({
      name: entry.label,
      value: entry.probability,
      color: scale(idx / Math.max(strategy.length - 1, 1)).hex(),
    }));
    const chart = useChart({ data });

    return (
      <BarSegment.Root chart={chart}>
        <BarSegment.Content>
          <BarSegment.Bar gap={0.5} />
        </BarSegment.Content>
        <BarSegment.Legend showPercent />
      </BarSegment.Root>
    );
  }
);

export default ProbChart;
