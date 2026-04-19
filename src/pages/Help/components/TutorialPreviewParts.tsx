import {
  Box,
  Button,
  Heading,
  HStack,
  Slider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import type React from "react";
import { useTranslation } from "react-i18next";
import { TbAdjustments, TbCalculator } from "react-icons/tb";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export interface TutorialChartDatum {
  name: string;
  value: number;
  color: string;
}

export const PreviewCard: React.FC<{
  title: string;
  active?: boolean;
  children: React.ReactNode;
}> = ({ title, active = false, children }) => {
  return (
    <Box
      p={4}
      borderRadius="sm"
      bg="bg.subtle"
      boxShadow="sm"
      borderWidth="2px"
      borderColor={active ? "blue.solid" : "transparent"}
    >
      <Stack gap={3}>
        <Heading size="md" as="h5">
          {title}
        </Heading>
        {children}
      </Stack>
    </Box>
  );
};

const TutorialProbabilityPreview: React.FC<{
  playerLabel: string;
  items: Array<{ name: string; value: number; color: string }>;
}> = ({ playerLabel, items }) => {
  const chart = useChart({ data: items });

  return (
    <Stack gap={2}>
      <Text fontSize="xs" color="fg.muted">
        {playerLabel}
      </Text>
      <BarSegment.Root chart={chart} barSize="5">
        <BarSegment.Content>
          <BarSegment.Bar gap={0} />
        </BarSegment.Content>
        <BarSegment.Legend showPercent />
      </BarSegment.Root>
    </Stack>
  );
};

export const TutorialResultPreview: React.FC<{
  valueText: string;
}> = ({ valueText }) => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");
  const expectedValueLabel = t("home.resultDisplay.expectedValueHeading", {
    player: player1Label,
  });
  const probabilityHeading = t("home.resultDisplay.probabilityHeading");
  const player1Probabilities = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: 66.666666667,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 33.333333333,
      color: "var(--chakra-colors-red-400)",
    },
  ];
  const player2Probabilities = [
    {
      name: t("presets.okizeme.strategyLabels2.guard"),
      value: 87,
      color: "var(--chakra-colors-blue-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels2.reversal"),
      value: 13,
      color: "var(--chakra-colors-blue-400)",
    },
  ];

  return (
    <Stack gap={3}>
      <Text fontSize="sm" color="fg.muted">
        {expectedValueLabel}: {valueText}
      </Text>
      <Stack gap={3}>
        <Heading size="sm" as="h6">
          {probabilityHeading}
        </Heading>
        <TutorialProbabilityPreview
          playerLabel={player1Label}
          items={player1Probabilities}
        />
        <TutorialProbabilityPreview
          playerLabel={player2Label}
          items={player2Probabilities}
        />
      </Stack>
    </Stack>
  );
};

const TutorialStrategySliderPreview: React.FC<{
  colorPalette: string;
  value: number[];
  active?: boolean;
}> = ({ colorPalette, value, active = false }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor={active ? `${colorPalette}.solid` : "border.subtle"}
      bg={active ? `${colorPalette}.subtle` : "transparent"}
      borderRadius="md"
      px={3}
      py={2}
    >
      <Slider.Root value={value} size="sm" thumbAlignment="center" disabled>
        <Slider.Control>
          <Slider.Track bg={`${colorPalette}.subtle`} />
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
};

const TutorialExpectedChartPreview: React.FC<{
  items: TutorialChartDatum[];
  active?: boolean;
}> = ({ items, active = false }) => {
  const data = items.map((item, index) => ({ ...item, index }));
  const chart = useChart({ data });

  return (
    <Box
      borderWidth="1px"
      borderColor={active ? "red.solid" : "border.subtle"}
      bg={active ? "red.subtle" : "transparent"}
      borderRadius="md"
      px={3}
      py={3}
    >
      <Chart.Root chart={chart} maxH="2xs">
        <BarChart data={chart.data}>
          <CartesianGrid
            vertical={false}
            stroke={chart.color("border.muted")}
          />
          <XAxis tickLine={false} dataKey={chart.key("name")} />
          <YAxis domain={[0, 1500]} ticks={[0, 500, 1000, 1500]} />
          <Bar dataKey="value" radius={2}>
            <LabelList position="top" dataKey={chart.key("value")} offset={8} />
            {chart.data.map((item) => (
              <Cell key={item.index} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </Chart.Root>
    </Box>
  );
};

export const TutorialAnalysisResultPreview: React.FC<{
  valueText: string;
  player2Probabilities?: TutorialChartDatum[];
  sliderValue?: number[];
  expectedChartItems?: TutorialChartDatum[];
  sliderActive?: boolean;
  expectedChartActive?: boolean;
}> = ({
  valueText,
  player2Probabilities,
  sliderValue,
  expectedChartItems,
  sliderActive = false,
  expectedChartActive = false,
}) => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");
  const expectedValueLabel = t("home.resultDisplay.expectedValueHeading", {
    player: player1Label,
  });
  const probabilityHeading = t("home.resultDisplay.probabilityHeading");
  const expectedHeading = t("home.resultDisplay.expectedHeading");
  const player1Probabilities = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: 66.666666667,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 33.333333333,
      color: "var(--chakra-colors-red-400)",
    },
  ];
  const defaultPlayer2Probabilities = [
    {
      name: t("presets.okizeme.strategyLabels2.guard"),
      value: 60,
      color: "var(--chakra-colors-blue-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels2.reversal"),
      value: 40,
      color: "var(--chakra-colors-blue-400)",
    },
  ];
  const defaultExpectedChartItems = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: -214.29,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 2476.19,
      color: "var(--chakra-colors-red-400)",
    },
  ];
  const resolvedPlayer2Probabilities =
    player2Probabilities ?? defaultPlayer2Probabilities;
  const resolvedSliderValue = sliderValue ?? [60];
  const resolvedExpectedChartItems =
    expectedChartItems ?? defaultExpectedChartItems;

  return (
    <Stack gap={3}>
      <Text fontSize="sm" color="fg.muted">
        {expectedValueLabel}: {valueText}
      </Text>
      <Stack gap={3}>
        <Heading size="sm" as="h6">
          {probabilityHeading}
        </Heading>
        <TutorialProbabilityPreview
          playerLabel={player1Label}
          items={player1Probabilities}
        />
        <Stack gap={2}>
          <TutorialProbabilityPreview
            playerLabel={player2Label}
            items={resolvedPlayer2Probabilities}
          />
          <TutorialStrategySliderPreview
            colorPalette="blue"
            value={resolvedSliderValue}
            active={sliderActive}
          />
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Heading size="sm" as="h6">
          {expectedHeading}
        </Heading>
        <TutorialExpectedChartPreview
          items={resolvedExpectedChartItems}
          active={expectedChartActive}
        />
      </Stack>
    </Stack>
  );
};

export const TutorialControlsPreview: React.FC<{
  presetMode: boolean;
  presetActive: boolean;
  calculateActive: boolean;
  selectedPresetLabel?: string;
}> = ({ presetMode, presetActive, calculateActive, selectedPresetLabel }) => {
  const { t } = useTranslation();
  const controlPanelLabel = t("home.tableControls.heading");
  const presetLabel = t("home.tableControls.presets");
  const calculateLabel = t("home.tableControls.calculate");

  return (
    <PreviewCard
      title={controlPanelLabel}
      active={presetActive || calculateActive}
    >
      <Stack gap={3}>
        {presetMode ? (
          <Box
            borderWidth="1px"
            borderColor={presetActive ? "blue.solid" : "border.subtle"}
            borderRadius="md"
            bg={presetActive ? "blue.subtle" : "bg"}
            p={3}
          >
            <Stack gap={2}>
              <Text fontSize="sm" fontWeight="medium">
                <TbAdjustments
                  style={{ display: "inline", marginRight: "0.375rem" }}
                />
                {presetLabel}
              </Text>
              <Box
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="sm"
                bg="bg.subtle"
                px={3}
                py={2}
              >
                <Text fontSize="sm">{selectedPresetLabel}</Text>
              </Box>
            </Stack>
          </Box>
        ) : null}

        <HStack justify="flex-start">
          <Box
            borderWidth="1px"
            borderColor={calculateActive ? "red.solid" : "border.subtle"}
            borderRadius="md"
            bg={calculateActive ? "red.subtle" : "transparent"}
            p="2"
          >
            <Button
              size="sm"
              colorPalette="blue"
              variant={calculateActive ? "solid" : "surface"}
              pointerEvents="none"
            >
              <TbCalculator />
              {calculateLabel}
            </Button>
          </Box>
        </HStack>
      </Stack>
    </PreviewCard>
  );
};
