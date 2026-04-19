import { Stack } from "@chakra-ui/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import {
  PreviewCard,
  TutorialControlsPreview,
  TutorialResultPreview,
} from "./TutorialPreviewParts";

interface TutorialPresetFlowPreviewProps {
  activeStep: 1 | 2 | 3;
}

export const TutorialPresetFlowPreview: React.FC<
  TutorialPresetFlowPreviewProps
> = ({ activeStep }) => {
  const { t } = useTranslation();
  const presetActive = activeStep === 1;
  const calculateActive = activeStep === 2;
  const resultsActive = activeStep === 3;

  return (
    <Stack gap={3}>
      <TutorialControlsPreview
        presetMode
        presetActive={presetActive}
        calculateActive={calculateActive}
        selectedPresetLabel={t("presets.okizeme.label")}
      />

      {resultsActive ? (
        <PreviewCard title={t("home.resultDisplay.heading")} active>
          <TutorialResultPreview valueText="+666.67" />
        </PreviewCard>
      ) : null}
    </Stack>
  );
};
