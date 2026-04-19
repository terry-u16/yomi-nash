import { Stack } from "@chakra-ui/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import {
  PreviewCard,
  TutorialAnalysisResultPreview,
  type TutorialChartDatum,
  TutorialControlsPreview,
} from "./TutorialPreviewParts";

interface TutorialCounterplayFlowPreviewProps {
  activeStep: 1 | 2 | 3;
}

export const TutorialCounterplayFlowPreview: React.FC<
  TutorialCounterplayFlowPreviewProps
> = ({ activeStep }) => {
  const { t } = useTranslation();
  const beforePlayer2Probabilities: TutorialChartDatum[] = [
    {
      name: t("presets.okizeme.strategyLabels2.guard"),
      value: 86.666666667,
      color: "var(--chakra-colors-blue-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels2.reversal"),
      value: 13.333333333,
      color: "var(--chakra-colors-blue-400)",
    },
  ];
  const afterPlayer2Probabilities: TutorialChartDatum[] = [
    {
      name: t("presets.okizeme.strategyLabels2.guard"),
      value: 75,
      color: "var(--chakra-colors-blue-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels2.reversal"),
      value: 25,
      color: "var(--chakra-colors-blue-400)",
    },
  ];
  const beforeExpectedChartItems: TutorialChartDatum[] = [
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
  const afterExpectedChartItems: TutorialChartDatum[] = [
    {
      name: t("presets.okizeme.strategyLabels1.meaty"),
      value: 375,
      color: "var(--chakra-colors-red-600)",
    },
    {
      name: t("presets.okizeme.strategyLabels1.wait"),
      value: 1250,
      color: "var(--chakra-colors-red-400)",
    },
  ];
  const adjusted = activeStep >= 2;

  return (
    <Stack gap={3}>
      {activeStep === 1 ? (
        <TutorialControlsPreview
          presetMode
          presetActive={false}
          calculateActive
          selectedPresetLabel={t("presets.okizeme.label")}
        />
      ) : null}
      {activeStep >= 1 ? (
        <PreviewCard
          title={t("home.resultDisplay.heading")}
          active
        >
          <TutorialAnalysisResultPreview
            valueText="+666.67"
            player2Probabilities={
              adjusted ? afterPlayer2Probabilities : beforePlayer2Probabilities
            }
            sliderValue={adjusted ? [75] : [87]}
            expectedChartItems={
              adjusted ? afterExpectedChartItems : beforeExpectedChartItems
            }
            sliderActive={activeStep === 2}
            expectedChartActive={activeStep === 1 || activeStep === 3}
          />
        </PreviewCard>
      ) : null}
    </Stack>
  );
};
