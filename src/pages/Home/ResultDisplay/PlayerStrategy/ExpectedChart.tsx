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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scaleLinear } from "d3-scale";
import { useTranslation } from "react-i18next";

interface Props {
  strategyLabels: string[];
  expectedPayoff: number[];
  inverted: boolean;
  colorpalette: string;
}

function arePropsEqual(oldProps: Props, newProps: Props): boolean {
  // 値込みで一致比較
  const isStrategyLabelsEqual =
    oldProps.strategyLabels.length === newProps.strategyLabels.length &&
    oldProps.strategyLabels.every(
      (oldLabel, i) => oldLabel === newProps.strategyLabels[i]
    );

  const isExpectedPayoffEqual =
    oldProps.expectedPayoff.length === newProps.expectedPayoff.length &&
    oldProps.expectedPayoff.every((oldValue, i) =>
      Object.is(oldValue, newProps.expectedPayoff[i])
    );

  return (
    isStrategyLabelsEqual &&
    isExpectedPayoffEqual &&
    Object.is(oldProps.inverted, newProps.inverted) &&
    Object.is(oldProps.colorpalette, newProps.colorpalette)
  );
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
  ({
    strategyLabels: strategy,
    expectedPayoff,
    inverted,
    colorpalette,
  }: Props) => {
    const { t } = useTranslation();
    const colors = useToken("colors", [
      `${colorpalette}.600`,
      `${colorpalette}.500`,
      `${colorpalette}.400`,
      `${colorpalette}.300`,
    ]);
    const colorScale = getChroma(strategy.length, colors);
    const data = strategy.map((entry, idx) => ({
      name: entry,
      value: Math.round(expectedPayoff[idx] * 100) / 100,
      index: idx,
      color: colorScale(idx / Math.max(strategy.length - 1, 1)).hex(),
    }));
    const chart = useChart({
      data,
    });

    // 値が負の数のみの場合、自動設定だとY軸の範囲がいい感じにならないので、手動で設定
    const lower = Math.min(...data.map((item) => item.value), 0);
    const upper = Math.max(...data.map((item) => item.value), 0);
    const difference = upper - lower;
    const domainLower = lower < 0 ? lower - difference * 0.2 : lower;
    const domainUpper = upper > 0 ? upper + difference * 0.2 : upper;
    const scale = scaleLinear().domain([domainLower, domainUpper]).nice();
    const ticks = scale.ticks(5);
    const domain = [domainLower, domainUpper];

    return (
      <Stack>
        <Heading size="sm" as="h4">
          {t("home.resultDisplay.expectedHeading")}
        </Heading>
        <Chart.Root maxH="3xs" chart={chart}>
          <BarChart data={chart.data}>
            <CartesianGrid
              vertical={false}
              stroke={chart.color("border.muted")}
            />
            <XAxis tickLine={false} dataKey={chart.key("name")} />
            <YAxis
              domain={domain}
              ticks={ticks}
              reversed={inverted}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: chart.color(`${colorpalette}.subtle`) }}
              animationDuration={100}
              content={
                <Chart.Tooltip hideLabel fitContent nameKey="rawValue" />
              }
            />
            <Bar dataKey="value" radius={2}>
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
  },
  arePropsEqual
);

export default ExpectedChart;
