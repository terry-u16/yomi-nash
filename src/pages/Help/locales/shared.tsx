import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { BarSegment, useChart } from "@chakra-ui/charts";
import type React from "react";
import { useTranslation } from "react-i18next";
import { TbAdjustments, TbCalculator } from "react-icons/tb";

interface HelpContentLayoutProps {
  children: React.ReactNode;
}

interface TutorialStepCardProps {
  step: string;
  title: string;
  description: React.ReactNode;
  visual?: React.ReactNode;
}

interface TutorialPresetFlowPreviewProps {
  activeStep: 1 | 2 | 3;
}

export const HelpContentLayout: React.FC<HelpContentLayoutProps> = ({ children }) => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>{children}</Stack>
    </Box>
  );
};

export const TutorialStepCard: React.FC<TutorialStepCardProps> = ({
  step,
  title,
  description,
  visual,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="lg"
      bg="bg"
      p={4}
      boxShadow="xs"
    >
      <Stack gap={4} direction={{ base: "column", lg: "row" }} align="stretch">
        <Stack gap={3} flex="1" minW="0">
          <HStack gap={3} align="center">
            <Box
              minW="2rem"
              h="2rem"
              borderRadius="full"
              bg="blue.solid"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {step}
            </Box>
            <Heading size="md" as="h4">
              {title}
            </Heading>
          </HStack>
          <Text color="fg.muted">{description}</Text>
        </Stack>
        {visual ? (
          <Box flex="1" minW={{ base: "auto", lg: "360px" }}>
            {visual}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};

const PreviewCard: React.FC<{
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

export const TutorialPresetFlowPreview: React.FC<TutorialPresetFlowPreviewProps> = ({
  activeStep,
}) => {
  const { t } = useTranslation();
  const presetActive = activeStep === 1;
  const calculateActive = activeStep === 2;
  const resultsActive = activeStep === 3;
  const controlPanelLabel = t("home.tableControls.heading");
  const presetLabel = t("home.tableControls.presets");
  const selectedPresetLabel = t("presets.okizeme.label");
  const calculateLabel = t("home.tableControls.calculate");
  const resultsLabel = t("home.resultDisplay.heading");
  const player1Label = t("common.player1");
  const player2Label = t("common.player2");
  const expectedValueLabel = t("home.resultDisplay.expectedValueHeading", {
    player: player1Label,
  });
  const probabilityHeading = t("home.resultDisplay.probabilityHeading");
  const player1Probabilities = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: 67,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 33,
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
      <PreviewCard title={controlPanelLabel} active={presetActive || calculateActive}>
        <Stack gap={3}>
          <Box
            borderWidth="1px"
            borderColor={presetActive ? "blue.solid" : "border.subtle"}
            borderRadius="md"
            bg={presetActive ? "blue.subtle" : "bg"}
            p={3}
          >
            <Stack gap={2}>
              <Text fontSize="sm" fontWeight="medium">
                <TbAdjustments style={{ display: "inline", marginRight: "0.375rem" }} />
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

      {resultsActive ? (
        <PreviewCard title={resultsLabel} active>
          <Stack gap={3}>
            <Text fontSize="sm" color="fg.muted">
              {expectedValueLabel}: +666.67
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
        </PreviewCard>
      ) : null}
    </Stack>
  );
};
