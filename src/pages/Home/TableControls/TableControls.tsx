import {
  Box,
  Button,
  Input,
  Menu,
  Portal,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import React, { useRef } from "react";
import type { GameInput, GameInputUI } from "../../../types/game";
import {
  generateCsvFromGameInputUI,
  parseCsvInputFromBinary,
} from "@/utils/parseCsvInput";
import {
  TbAdjustments,
  TbCalculator,
  TbFileDownload,
  TbFileUpload,
} from "react-icons/tb";
import { parseGameInputUI } from "@/utils/parseGameInput";
import { presets } from "@/presets";
import { clampGameInputUI } from "@/utils/clampGameInput";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void;
}

const TableControls = React.memo(
  ({ inputUI, setInputUI, onCalculate }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = ""; // reset the input value to allow re-uploading the same file
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const binary = new Uint8Array(reader.result as ArrayBuffer);
        const result = parseCsvInputFromBinary(binary);

        if (result.ok) {
          const { strategyLabels1, strategyLabels2, payoffMatrix } =
            result.data;

          setInputUI(
            clampGameInputUI({
              strategyLabels1,
              strategyLabels2,
              payoffMatrix,
            })
          );

          toaster.create({
            title: "CSVを読み込みました",
            type: "success",
          });
        } else {
          toaster.create({
            title: `CSVの読み込みに失敗しました`,
            description: result.message,
            type: "error",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    };

    const handleDownload = () => {
      const csv = generateCsvFromGameInputUI(inputUI);
      const bom = "\uFEFF"; // UTF-8 BOM
      const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "yomi-nash.csv";
      link.click();
      URL.revokeObjectURL(url);

      toaster.create({
        title: "CSVをダウンロードしています...",
      });
    };

    const handleCalculate = () => {
      const result = parseGameInputUI(inputUI);
      if (result.ok) {
        onCalculate(result.data);
      } else {
        toaster.create({
          title: "入力にエラーがあります",
          description: result.errors
            .map((err) => `(${err.row + 1}行 ${err.col + 1}列)`)
            .join(", "),
          type: "error",
        });
      }
    };

    const applyPreset = (preset: string) => {
      const { label, data: gameInput } = presets[preset];
      setInputUI(gameInput);
      toaster.create({
        title: `プリセット ${label} を適用しました`,
        type: "success",
      });
    };

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          操作パネル
        </Heading>
        <Flex gap={4} direction="row" wrap="wrap">
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
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="surface">
                <TbAdjustments /> サンプルプリセット
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {Object.entries(presets).map(([key, preset]) => (
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
          <Button colorPalette="blue" onClick={handleCalculate}>
            <TbCalculator /> 計算
          </Button>
        </Flex>
      </Box>
    );
  }
);

export default TableControls;
