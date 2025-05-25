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
import { scaleLinear } from "d3-scale";

interface Props {
  strategy: MixedStrategy;
  expectedPayoff: number[];
  inverted: boolean;
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
  ({ strategy, expectedPayoff, inverted, colorpalette }: Props) => {
    const colors = useToken("colors", [
      `${colorpalette}.600`,
      `${colorpalette}.500`,
      `${colorpalette}.400`,
      `${colorpalette}.300`,
    ]);
    const colorScale = getChroma(strategy.length, colors);
    const data = strategy.map((entry, idx) => ({
      name: entry.label,
      value:
        (Math.round(expectedPayoff[idx] * 100) / 100) * (inverted ? -1 : 1),
      index: idx,
      color: colorScale(idx / Math.max(strategy.length - 1, 1)).hex(),
    }));
    const chart = useChart({
      data,
    });

    // 値が負の数のみの場合、自動設定だとY軸の範囲がいい感じにならないので、手動で設定
    const domainLower = Math.min(...data.map((item) => item.value), 0) * 1.3;
    const domainUpper = Math.max(...data.map((item) => item.value), 0) * 1.3;
    const scale = scaleLinear().domain([domainLower, domainUpper]).nice();
    const ticks = scale.ticks(5);
    const domain = scale.domain();

    return (
      <Stack>
        <Heading size="sm" as="h4">
          期待値
        </Heading>
        <Chart.Root maxH="2xs" chart={chart}>
          <BarChart data={chart.data}>
            <CartesianGrid
              vertical={false}
              stroke={chart.color("border.muted")}
            />
            <XAxis tickLine={false} dataKey={chart.key("name")} />
            <YAxis
              
              domain={domain}
              ticks={ticks}
              tickFormatter={(value) =>
                (value * (inverted ? -1 : 1)).toString()
              }
            />
            <Bar dataKey="value" radius={4}>
              <LabelList
                position="top"
                dataKey={chart.key("value")}
                offset={8}
                formatter={(value: number) =>
                  (value * (inverted ? -1 : 1)).toString()
                }
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
