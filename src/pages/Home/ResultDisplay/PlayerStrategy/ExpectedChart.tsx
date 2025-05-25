import type { MixedStrategy } from "@/types/game";
import { Heading, Stack, useToken } from "@chakra-ui/react";
import React from "react";
import { Chart, useChart } from "@chakra-ui/charts";
import chroma from "chroma-js";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  strategy: MixedStrategy;
  expectedPayoff: number[];
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

const ExpectedChart: React.FC<Props> = React.memo(
  ({ strategy, expectedPayoff, colorpalette }: Props) => {
    const colors = useToken("colors", [
      `${colorpalette}.600`,
      `${colorpalette}.500`,
      `${colorpalette}.400`,
      `${colorpalette}.300`,
    ]);
    const scale = getChroma(strategy.length, colors);
    const data = strategy.map((entry, idx) => ({
      name: entry.label,
      value: Math.round(expectedPayoff[idx] * 100) / 100,
      index: idx,
      color: scale(idx / Math.max(strategy.length - 1, 1)).hex(),
    }));
    const chart = useChart({
      data,
    });

    return (
      <Stack>
        <Heading size="sm" as="h4">
          期待値
        </Heading>
        <Chart.Root maxH="3xs" chart={chart}>
          <BarChart data={chart.data}>
            <CartesianGrid vertical={false} stroke={chart.color("border.muted")} />
            <XAxis tickLine={false} dataKey={chart.key("name")} />
            <YAxis />
            <Bar dataKey="value" radius={4}>
              <LabelList
                position="top"
                dataKey={chart.key("value")}
                offset={8}
              />
              {chart.data.map((item) => (
                <Cell key={item.index} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </Chart.Root>
      </Stack>
    );
  }
);

export default ExpectedChart;
