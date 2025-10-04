import {
  Box,
  Button,
  Input,
  Menu,
  Portal,
  Flex,
  Heading,
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

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void | Promise<void>;
  result?: GameResult | null;
  onReset?: () => void; // 親で result を消したいのでコールバック
}

const TableControls = React.memo(
  ({ inputUI, setInputUI, onCalculate, result, onReset }: Props) => {
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
          操作パネル
        </Heading>
        <Flex gap={4} direction="row" wrap="wrap">
          <Button colorPalette="blue" onClick={handleCalculate}>
            <TbCalculator /> 計算
          </Button>
          <Button variant="surface" onClick={handleShare}>
            <TbShare3 /> シェア
          </Button>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="surface">
                <TbAdjustments /> サンプルプリセット
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
                      {preset.label}
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
            <TbFileUpload /> CSVアップロード
          </Button>
          <Input
            type="file"
            accept=".csv"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <Button variant="surface" onClick={handleDownload}>
            <TbFileDownload /> CSVダウンロード
          </Button>
          <Button variant="outline" colorPalette="red" onClick={handleReset}>
            <TbRestore /> リセット
          </Button>
        </Flex>
      </Box>
    );
  }
);

export default TableControls;
