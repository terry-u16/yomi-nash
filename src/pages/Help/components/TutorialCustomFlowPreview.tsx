import { Box, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import {
  PreviewCard,
  TutorialControlsPreview,
  TutorialResultPreview,
} from "./TutorialPreviewParts";

interface TutorialCustomFlowPreviewProps {
  activeStep: 1 | 2 | 3 | 4;
}

const TableCell: React.FC<{
  children: React.ReactNode;
  bg?: string;
  borderColor?: string;
}> = ({ children, bg = "bg", borderColor = "border.subtle" }) => {
  return (
    <Box
      minH="44px"
      px={2}
      py={2}
      borderWidth="1px"
      borderColor={borderColor}
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      fontSize="sm"
      borderRadius="sm"
    >
      {children}
    </Box>
  );
};

const TutorialPayoffTablePreview: React.FC<{
  activeStep: 1 | 2;
}> = ({ activeStep }) => {
  const { t } = useTranslation();
  const labelsActive = activeStep === 1;
  const valuesActive = activeStep === 2;

  const cells = [
    {
      key: "corner",
      content: t("home.payoffTable.playerHeader", {
        // `Player 1 / Player 2` だと長すぎるため、ここでは `P1 / P2` とする。
        player1: "P1",
        player2: "P2",
      }),
      bg: "bg",
      borderColor: "border.solid",
    },
    {
      key: "col1",
      content: t("presets.okizeme.strategyLabels2.guard"),
      bg: labelsActive ? "blue.subtle" : "bg",
      borderColor: labelsActive ? "blue.solid" : "border.solid",
    },
    {
      key: "col2",
      content: t("presets.okizeme.strategyLabels2.reversal"),
      bg: labelsActive ? "blue.subtle" : "bg",
      borderColor: labelsActive ? "blue.solid" : "border.solid",
    },
    {
      key: "row1",
      content: t("presets.okizeme.strategyLabels1.meaty"),
      bg: labelsActive ? "red.subtle" : "bg",
      borderColor: labelsActive ? "red.solid" : "border.solid",
    },
    {
      key: "v11",
      content: "1000",
      bg: valuesActive ? "green.subtle" : "bg",
      borderColor: valuesActive ? "green.solid" : "border.solid",
    },
    {
      key: "v12",
      content: "-1500",
      bg: valuesActive ? "green.subtle" : "bg",
      borderColor: valuesActive ? "green.solid" : "border.solid",
    },
    {
      key: "row2",
      content: t("presets.okizeme.strategyLabels1.wait"),
      bg: labelsActive ? "red.subtle" : "bg",
      borderColor: labelsActive ? "red.solid" : "border.solid",
    },
    {
      key: "v21",
      content: "0",
      bg: valuesActive ? "green.subtle" : "bg",
      borderColor: valuesActive ? "green.solid" : "border.solid",
    },
    {
      key: "v22",
      content: "5000",
      bg: valuesActive ? "green.subtle" : "bg",
      borderColor: valuesActive ? "green.solid" : "border.solid",
    },
  ];

  return (
    <PreviewCard title={t("home.payoffTable.heading")} active>
      <Stack gap={3}>
        <Box display="grid" gridTemplateColumns="1.1fr 1fr 1fr" gap={2}>
          {cells.map((cell) => (
            <TableCell
              key={cell.key}
              bg={cell.bg}
              borderColor={cell.borderColor}
            >
              <Text fontWeight="normal">{cell.content}</Text>
            </TableCell>
          ))}
        </Box>
      </Stack>
    </PreviewCard>
  );
};

export const TutorialCustomFlowPreview: React.FC<
  TutorialCustomFlowPreviewProps
> = ({ activeStep }) => {
  const { t } = useTranslation();
  const resultsActive = activeStep === 4;

  return (
    <Stack gap={3}>
      {activeStep === 1 || activeStep === 2 ? (
        <TutorialPayoffTablePreview activeStep={activeStep} />
      ) : null}
      {activeStep >= 3 ? (
        <TutorialControlsPreview
          presetMode={false}
          presetActive={false}
          calculateActive={activeStep === 3}
        />
      ) : null}
      {resultsActive ? (
        <PreviewCard title={t("home.resultDisplay.heading")} active>
          <TutorialResultPreview valueText="+666.67" />
        </PreviewCard>
      ) : null}
    </Stack>
  );
};
