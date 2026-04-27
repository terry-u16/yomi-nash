import { useColorMode } from "@/components/ui/color-mode";
import {
  Badge,
  Box,
  Button,
  FormatNumber,
  Grid,
  Heading,
  HStack,
  Slider,
  Stack,
  Stat,
  Table,
  Text,
  useToken,
} from "@chakra-ui/react";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import chroma from "chroma-js";
import { scaleLinear } from "d3-scale";
import type React from "react";
import { useTranslation } from "react-i18next";
import {
  TbAdjustments,
  TbArrowUpRight,
  TbCalculator,
  TbFileDownload,
  TbFileUpload,
  TbRestore,
  TbShare3,
} from "react-icons/tb";
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

const payoffToColor = (
  payoff: number,
  maxAbs: number,
  colors: [string, string, string]
): string => {
  const normalized = Math.max(-1, Math.min(1, payoff / maxAbs));
  const scale = chroma.scale(colors).domain([-1, 0, 1]);
  return scale(normalized).hex();
};

const ResultBarCell: React.FC<{
  payoff: number;
  prob: number;
  maxAbsPayoff: number;
  colors: [string, string, string];
}> = ({ payoff, prob, maxAbsPayoff, colors }) => (
  <Table.Cell position="relative" p={0}>
    <Box>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        width={`${(prob * 100).toFixed(2)}%`}
        bg={payoffToColor(payoff, maxAbsPayoff, colors)}
        zIndex="base"
        rounded="none"
        my={1}
      />
      <Box
        position="relative"
        zIndex="docked"
        px={2}
        minH="36px"
        fontSize="sm"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textAlign="left">
          <FormatNumber
            value={payoff}
            maximumFractionDigits={2}
            minimumFractionDigits={0}
          />
        </Text>
        <Text textAlign="right">
          <FormatNumber
            value={prob}
            style="percent"
            maximumFractionDigits={2}
            minimumFractionDigits={2}
          />
        </Text>
      </Box>
    </Box>
  </Table.Cell>
);

const ExpectedValueStatMock: React.FC<{
  playerLabel: string;
  value: number;
}> = ({ playerLabel, value }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading size="lg" as="h3" mb={1}>
        {t("home.resultDisplay.expectedValueHeading", { player: playerLabel })}
      </Heading>
      <Stat.Root size="lg">
        <HStack>
          <Stat.ValueText>
            <FormatNumber
              value={value}
              maximumFractionDigits={2}
              minimumFractionDigits={2}
            />
          </Stat.ValueText>
          <Badge colorPalette="red" py={1}>
            <TbArrowUpRight /> {t("home.resultDisplay.badge.slightAdvantage")}
          </Badge>
        </HStack>
      </Stat.Root>
    </Box>
  );
};

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
  sliderActive: boolean;
  colorPalette: string;
}> = ({ playerLabel, items, sliderActive, colorPalette }) => {
  const chart = useChart({ data: items });
  const value = items.slice(0, items.length - 1).map((item) => item.value);

  return (
    <Stack gap={2}>
      <Text fontSize="xs" color="fg.muted">
        {playerLabel}
      </Text>
      <Stack gap={1}>
        <Box
          borderWidth="1px"
          borderColor={sliderActive ? `${colorPalette}.solid` : "border.subtle"}
          bg={sliderActive ? `${colorPalette}.subtle` : "transparent"}
          borderRadius="md"
          px={sliderActive ? 1 : 0}
          py={sliderActive ? 1 : 0}
        >
          <Slider.Root value={value} size="sm" thumbAlignment="center" disabled>
            <Slider.Control>
              <Slider.Track
                bg={
                  sliderActive
                    ? `${colorPalette}.solid`
                    : `${colorPalette}.subtle`
                }
              />
              <Slider.Thumbs
                borderColor={
                  sliderActive
                    ? `${colorPalette}.solid`
                    : `${colorPalette}.subtle`
                }
                bg="bg"
              />
            </Slider.Control>
          </Slider.Root>
        </Box>
        <BarSegment.Root chart={chart} barSize="5">
          <BarSegment.Content>
            <BarSegment.Bar gap={0} />
          </BarSegment.Content>
          <BarSegment.Legend showPercent />
        </BarSegment.Root>
      </Stack>
    </Stack>
  );
};

export const TutorialResultPreview: React.FC<{
  valueText: string;
  player2SliderActive: boolean;
}> = ({ valueText, player2SliderActive: sliderActive }) => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");
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
      <ExpectedValueStatMock
        playerLabel={player1Label}
        value={Number.parseFloat(valueText)}
      />
      <Stack gap={3}>
        <Heading size="sm" as="h6">
          {probabilityHeading}
        </Heading>
        <TutorialProbabilityPreview
          playerLabel={player1Label}
          items={player1Probabilities}
          sliderActive={false}
          colorPalette="red"
        />
        <TutorialProbabilityPreview
          playerLabel={player2Label}
          items={player2Probabilities}
          sliderActive={sliderActive}
          colorPalette="blue"
        />
      </Stack>
    </Stack>
  );
};

const TutorialExpectedChartPreview: React.FC<{
  items: TutorialChartDatum[];
  active?: boolean;
}> = ({ items, active = false }) => {
  const data = items.map((item, index) => ({ ...item, index }));
  const chart = useChart({ data });
  const lower = Math.min(...data.map((item) => item.value), 0);
  const upper = Math.max(...data.map((item) => item.value), 0);
  const difference = upper - lower;
  const domainLower = lower < 0 ? lower - difference * 0.2 : lower;
  const domainUpper = upper > 0 ? upper + difference * 0.2 : upper;
  const scale = scaleLinear().domain([domainLower, domainUpper]).nice();
  const ticks = scale.ticks(5);
  const domain = [domainLower, domainUpper];

  return (
    <Box
      borderWidth="1px"
      borderColor={active ? "blue.solid" : "border.subtle"}
      bg={active ? "blue.subtle" : "transparent"}
      borderRadius="md"
      px={3}
      py={3}
    >
      <Chart.Root chart={chart} maxH="2xs">
        <BarChart data={chart.data}>
          <CartesianGrid
            horizontal={false}
            vertical={false}
            stroke={chart.color("border.muted")}
          />
          <XAxis tickLine={false} dataKey={chart.key("name")} />
          <YAxis domain={domain} ticks={ticks} interval={0} />
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
  player2Probabilities: TutorialChartDatum[];
  expectedChartItems: TutorialChartDatum[];
  sliderActive?: boolean;
  expectedChartActive?: boolean;
}> = ({
  valueText,
  player2Probabilities,
  expectedChartItems,
  sliderActive = false,
  expectedChartActive = false,
}) => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");
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

  return (
    <Stack gap={3}>
      <ExpectedValueStatMock
        playerLabel={player1Label}
        value={Number.parseFloat(valueText)}
      />
      <Stack gap={3}>
        <Heading size="sm" as="h6">
          {probabilityHeading}
        </Heading>
        <Stack gap={2}>
          <TutorialProbabilityPreview
            playerLabel={player1Label}
            items={player1Probabilities}
            sliderActive={false}
            colorPalette="red"
          />
        </Stack>
        <Stack gap={2}>
          <TutorialProbabilityPreview
            playerLabel={player2Label}
            items={player2Probabilities}
            sliderActive={sliderActive}
            colorPalette="blue"
          />
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Heading size="sm" as="h6">
          {expectedHeading}
        </Heading>
        <TutorialExpectedChartPreview
          items={expectedChartItems}
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
            borderColor={calculateActive ? "blue.solid" : "border.subtle"}
            borderRadius="md"
            bg={calculateActive ? "blue.subtle" : "transparent"}
            p="2"
          >
            <Button
              size="sm"
              colorPalette="blue"
              variant={calculateActive ? "solid" : "surface"}
              tabIndex={-1}
              aria-hidden="true"
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

export const ControlPanelOverviewMock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      p={6}
      borderRadius="sm"
      bg="bg.subtle"
      boxShadow="sm"
      w="fit-content"
      maxW="100%"
    >
      <Stack gap={4}>
        <Heading size="xl" as="h3">
          {t("home.tableControls.heading")}
        </Heading>
        <HStack gap={4} align="stretch" wrap="wrap">
          <Button
            colorPalette="blue"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbCalculator />
            {t("home.tableControls.calculate")}
          </Button>
          <Button
            variant="surface"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbShare3 />
            {t("home.tableControls.share")}
          </Button>
          <Button
            variant="surface"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbAdjustments />
            {t("home.tableControls.presets")}
          </Button>
          <Button
            variant="surface"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbFileUpload />
            {t("home.tableControls.upload")}
          </Button>
          <Button
            variant="surface"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbFileDownload />
            {t("home.tableControls.download")}
          </Button>
          <Button
            variant="outline"
            colorPalette="red"
            tabIndex={-1}
            aria-hidden="true"
            pointerEvents="none"
          >
            <TbRestore />
            {t("home.tableControls.reset")}
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export const ResultTableOverviewMock: React.FC = () => {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const [lightGray, lightRed, lightBlue, darkGray, darkRed, darkBlue] =
    useToken("colors", [
      "gray.300",
      "red.600",
      "blue.600",
      "gray.700",
      "red.600",
      "blue.600",
    ]);
  const [gray, red, blue] =
    colorMode === "light"
      ? [lightGray, lightRed, lightBlue]
      : [darkGray, darkRed, darkBlue];
  const payoffColors: [string, string, string] = [blue, gray, red];
  const maxAbsPayoff = 5000;

  return (
    <Box
      p={6}
      my={2}
      borderRadius="sm"
      bg="bg.subtle"
      boxShadow="sm"
      w="fit-content"
      maxW="100%"
    >
      <Heading size="lg" as="h3" mb={2}>
        {t("home.resultDisplay.detailHeading")}
      </Heading>
      <Table.ScrollArea>
        <Table.Root
          variant="outline"
          size="sm"
          showColumnBorder
          style={{ tableLayout: "fixed" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="120px">
                {t("home.resultDisplay.playerHeader", {
                  player1: t("common.player1"),
                  player2: t("common.player2"),
                })}
              </Table.ColumnHeader>
              <Table.ColumnHeader w="120px">
                {t("presets.okizeme.strategyLabels2.guard")}
              </Table.ColumnHeader>
              <Table.ColumnHeader w="120px">
                {t("presets.okizeme.strategyLabels2.reversal")}
              </Table.ColumnHeader>
              <Table.ColumnHeader w="120px">
                {t("common.total")}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {t("presets.okizeme.strategyLabels1.meaty")}
              </Table.Cell>
              <ResultBarCell
                payoff={1000}
                prob={0.5778}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={-1500}
                prob={0.0889}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={666.67}
                prob={0.6667}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t("presets.okizeme.strategyLabels1.wait")}
              </Table.Cell>
              <ResultBarCell
                payoff={0}
                prob={0.2889}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={5000}
                prob={0.0444}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={666.67}
                prob={0.3333}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t("common.total")}</Table.Cell>
              <ResultBarCell
                payoff={666.67}
                prob={0.8667}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={666.67}
                prob={0.1333}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
              <ResultBarCell
                payoff={666.67}
                prob={1}
                maxAbsPayoff={maxAbsPayoff}
                colors={payoffColors}
              />
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

const ResultStrategyOverviewMock: React.FC<{
  playerLabel: string;
  playerName: string;
  items: TutorialChartDatum[];
  expectedChartItems: TutorialChartDatum[];
  colorPalette: string;
}> = ({ playerLabel, playerName, items, expectedChartItems, colorPalette }) => {
  const { t } = useTranslation();

  return (
    <Stack mb={-4}>
      <Heading size="lg" as="h3">
        {t("home.resultDisplay.playerStrategy", { player: playerName })}
      </Heading>
      <TutorialProbabilityPreview
        playerLabel={playerLabel}
        items={items}
        sliderActive={false}
        colorPalette={colorPalette}
      />
      <Stack gap={2}>
        <Heading size="sm" as="h6">
          {t("home.resultDisplay.expectedHeading")}
        </Heading>
        <TutorialExpectedChartPreview items={expectedChartItems} />
      </Stack>
    </Stack>
  );
};

export const ExpectedValueOverviewMock: React.FC = () => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");

  return (
    <Box
      p={6}
      my={2}
      borderRadius="sm"
      bg="bg.subtle"
      boxShadow="sm"
      w="fit-content"
      maxW="100%"
    >
      <ExpectedValueStatMock playerLabel={player1Label} value={666.67} />
    </Box>
  );
};

export const StrategyAdjustmentOverviewMock: React.FC = () => {
  const { t } = useTranslation();
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");

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
  const player1Expected = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: 666.67,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 666.67,
      color: "var(--chakra-colors-red-400)",
    },
  ];
  const player2Expected = [
    {
      name: t("presets.okizeme.strategyLabels2.guard"),
      value: -666.67,
      color: "var(--chakra-colors-blue-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels2.reversal"),
      value: -666.67,
      color: "var(--chakra-colors-blue-400)",
    },
  ];

  return (
    <Box w="100%" css={{ containerType: "inline-size" }}>
      <Box
        p={6}
        my={2}
        borderRadius="sm"
        bg="bg.subtle"
        boxShadow="sm"
        w="fit-content"
        maxW="100%"
      >
        <Grid
          gap={4}
          templateColumns="repeat(2, minmax(250px, 400px))"
          css={{
            "@container (max-width: 563px)": {
              gridTemplateColumns: "minmax(min(250px, 100%), 400px)",
            },
          }}
        >
          <Box minW={0}>
            <ResultStrategyOverviewMock
              playerLabel={player1Label}
              playerName={player1Label}
              items={player1Probabilities}
              expectedChartItems={player1Expected}
              colorPalette="red"
            />
          </Box>
          <Box minW={0}>
            <ResultStrategyOverviewMock
              playerLabel={player2Label}
              playerName={player2Label}
              items={player2Probabilities}
              expectedChartItems={player2Expected}
              colorPalette="blue"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
