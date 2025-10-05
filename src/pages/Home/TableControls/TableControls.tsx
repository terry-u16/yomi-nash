import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Input,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import React from "react";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import {
  TbAdjustments,
  TbCalculator,
  TbFileDownload,
  TbFileUpload,
  TbRestore,
  TbShare3,
} from "react-icons/tb";
import { presetEntries } from "@/lib/presets";
import { useTableControls } from "./useTableControls";
import { useTranslation } from "react-i18next";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void | Promise<void>;
  result?: GameResult | null;
  onReset?: () => void; // 親で result を消したいのでコールバック
}

const TableControls = React.memo(
  ({ inputUI, setInputUI, onCalculate, result, onReset }: Props) => {
    const { t } = useTranslation();
    const {
      fileInputRef,
      handleUpload,
      handleDownload,
      handleCalculate,
      applyPreset,
      handleShare,
      handleReset,
    } = useTableControls({
      inputUI,
      setInputUI,
      onCalculate,
      result,
      onReset,
    });

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          {t("home.tableControls.heading")}
        </Heading>
        <Flex gap={4} direction="row" wrap="wrap">
          <Button colorPalette="blue" onClick={handleCalculate}>
            <TbCalculator /> {t("home.tableControls.calculate")}
          </Button>
          <Button variant="surface" onClick={handleShare}>
            <TbShare3 /> {t("home.tableControls.share")}
          </Button>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="surface">
                <TbAdjustments /> {t("home.tableControls.presets")}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {presetEntries.map(([key, preset]) => (
                    <Menu.Item
                      key={key}
                      value={key}
                      onClick={() => applyPreset(key)}
                    >
                      {t(preset.labelKey)}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Button
            variant="surface"
            onClick={() => fileInputRef.current?.click()}
          >
            <TbFileUpload /> {t("home.tableControls.upload")}
          </Button>
          <Input
            type="file"
            accept=".csv"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <Button variant="surface" onClick={handleDownload}>
            <TbFileDownload /> {t("home.tableControls.download")}
          </Button>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="outline" colorPalette="red">
                <TbRestore /> {t("home.tableControls.reset")}
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>
                      {t("home.tableControls.dialogTitle")}
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Text>{t("home.tableControls.dialogBody")}</Text>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">{t("common.cancel")}</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button colorPalette="red" onClick={handleReset}>
                        {t("home.tableControls.confirmReset")}
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>
      </Box>
    );
  }
);

export default TableControls;
