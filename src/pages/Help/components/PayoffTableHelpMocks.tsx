import { Box, Button, Grid, Input, Text } from "@chakra-ui/react";
import type React from "react";
import { useTranslation } from "react-i18next";
import {
  TbArrowsUpLeft,
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertBottom,
  TbRowRemove,
} from "react-icons/tb";

export type PayoffTableHighlightMode =
  | "names"
  | "values"
  | "add"
  | "delete"
  | "transpose";

const MockFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box mt={2} overflowX="auto">
      <Box
        display="inline-block"
        p={{ base: 2, md: 3 }}
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="lg"
        bg="bg"
        boxShadow="xs"
      >
        {children}
      </Box>
    </Box>
  );
};

const HighlightWrap: React.FC<{
  active?: boolean;
  children: React.ReactNode;
}> = ({ active = false, children }) => {

  return (
    <Box
      p="0.5"
      borderRadius="md"
      opacity={active ? 1 : 0.5}
      transition="opacity 0.2s ease"
    >
      {children}
    </Box>
  );
};

const StaticInput: React.FC<{
  value: string;
  activeColor?: "red" | "blue";
  active?: boolean;
  textAlign?: "start" | "center" | "end";
}> = ({ value, activeColor, active = false, textAlign = "start" }) => {
  const activeStyles =
    active && activeColor === "red"
      ? {
          color: "red.fg",
          borderColor: "red.muted",
          bg: { base: "red.50", _dark: "red.950" },
        }
      : active && activeColor === "blue"
        ? {
            color: "blue.fg",
            borderColor: "blue.muted",
            bg: { base: "blue.50", _dark: "blue.950" },
          }
        : {
            color: "fg.muted",
            borderColor: "border.subtle",
            bg: "bg.subtle",
          };

  return (
    <Input
      value={value}
      readOnly
      pointerEvents="none"
      size="sm"
      variant="outline"
      textAlign={textAlign}
      {...activeStyles}
    />
  );
};

const ValueCell: React.FC<{ value: string; active?: boolean }> = ({ value, active = false }) => {
  return (
    <StaticInput
      value={value}
      activeColor="blue"
      active={active}
    />
  );
};

const SmallButton: React.FC<{
  children: React.ReactNode;
  active?: boolean;
}> = ({ children, active = false }) => {
  return (
    <Button
      size="sm"
      variant={active ? "surface" : "outline"}
      pointerEvents="none"
      w="100%"
      colorPalette={active ? "blue" : undefined}
      color={active ? undefined : "fg.muted"}
      borderColor={active ? undefined : "border.subtle"}
      bg={active ? undefined : "bg.subtle"}
    >
      {children}
    </Button>
  );
};

export const PayoffTableOverviewMock: React.FC<{
  mode: PayoffTableHighlightMode;
}> = ({ mode }) => {
  const { t } = useTranslation();
  const highlightNames = mode === "names";
  const highlightValues = mode === "values";
  const highlightAdd = mode === "add";
  const highlightDelete = mode === "delete";
  const highlightTranspose = mode === "transpose";

  return (
    <MockFrame>
      <Grid w="720px" templateColumns="repeat(4, 1fr)" gap={2}>
        <HighlightWrap>
          <Box
            minH="32px"
            px={2}
            py={2}
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="sm"
            bg="bg.subtle"
          >
            <Text fontSize="sm" fontWeight="medium" color="fg.muted">
              {t("home.payoffTable.playerHeader", {
                player1: t("common.player1"),
                player2: t("common.player2"),
              })}
            </Text>
          </Box>
        </HighlightWrap>

        <HighlightWrap active={highlightNames}>
          <StaticInput
            value={t("presets.okizeme.strategyLabels2.guard")}
            activeColor="blue"
            active={highlightNames}
          />
        </HighlightWrap>
        <HighlightWrap active={highlightNames}>
          <StaticInput
            value={t("presets.okizeme.strategyLabels2.reversal")}
            activeColor="blue"
            active={highlightNames}
          />
        </HighlightWrap>
        <HighlightWrap active={highlightAdd}>
          <SmallButton active={highlightAdd}>
            <TbColumnInsertRight /> {t("home.payoffTable.addCol")}
          </SmallButton>
        </HighlightWrap>

        <HighlightWrap active={highlightNames}>
          <StaticInput
            value={t("presets.okizeme.strategyLabels1.meaty")}
            activeColor="red"
            active={highlightNames}
          />
        </HighlightWrap>
        <HighlightWrap active={highlightValues}>
          <ValueCell value="1000" active={highlightValues} />
        </HighlightWrap>
        <HighlightWrap active={highlightValues}>
          <ValueCell value="-1500" active={highlightValues} />
        </HighlightWrap>
        <HighlightWrap active={highlightDelete}>
          <SmallButton active={highlightDelete}>
            <TbRowRemove /> {t("home.payoffTable.deleteRow")}
          </SmallButton>
        </HighlightWrap>

        <HighlightWrap active={highlightNames}>
          <StaticInput
            value={t("presets.okizeme.strategyLabels1.wait")}
            activeColor="red"
            active={highlightNames}
          />
        </HighlightWrap>
        <HighlightWrap active={highlightValues}>
          <ValueCell value="0" active={highlightValues} />
        </HighlightWrap>
        <HighlightWrap active={highlightValues}>
          <ValueCell value="5000" active={highlightValues} />
        </HighlightWrap>
        <HighlightWrap active={highlightDelete}>
          <SmallButton active={highlightDelete}>
            <TbRowRemove /> {t("home.payoffTable.deleteRow")}
          </SmallButton>
        </HighlightWrap>

        <HighlightWrap active={highlightAdd}>
          <SmallButton active={highlightAdd}>
            <TbRowInsertBottom /> {t("home.payoffTable.addRow")}
          </SmallButton>
        </HighlightWrap>
        <HighlightWrap active={highlightDelete}>
          <SmallButton active={highlightDelete}>
            <TbColumnRemove /> {t("home.payoffTable.deleteCol")}
          </SmallButton>
        </HighlightWrap>
        <HighlightWrap active={highlightDelete}>
          <SmallButton active={highlightDelete}>
            <TbColumnRemove /> {t("home.payoffTable.deleteCol")}
          </SmallButton>
        </HighlightWrap>
        <HighlightWrap active={highlightTranspose}>
          <SmallButton active={highlightTranspose}>
            <TbArrowsUpLeft /> {t("home.payoffTable.transposeButton")}
          </SmallButton>
        </HighlightWrap>
      </Grid>
    </MockFrame>
  );
};
