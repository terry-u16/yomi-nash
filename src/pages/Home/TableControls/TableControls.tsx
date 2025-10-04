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
import React, { useCallback, useRef } from "react";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import {
  generateCsvFromGameInputUI,
  parseCsvInputFromBinary,
} from "@/utils/parseCsvInput";
import {
  TbAdjustments,
  TbCalculator,
  TbFileDownload,
  TbFileUpload,
  TbRestore,
  TbShare3,
} from "react-icons/tb";
import { parseGameInputUI } from "@/utils/parseGameInput";
import {
  createDefaultGameInputUI,
  createPresetSnapshot,
  presetEntries,
  presets,
  type PresetKey,
} from "@/presets";
import { clampGameInputUI } from "@/utils/clampGameInput";
import { createShareUrl } from "@/utils/createShareUrl";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void | Promise<void>;
  result?: GameResult | null;
  onReset?: () => void; // 親で result を消したいのでコールバック
}

const TableControls = React.memo(
  ({ inputUI, setInputUI, onCalculate, result, onReset }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = ""; // allow selecting the same file repeatedly
      if (!file) return;

      try {
        const arrayBuffer = await file.arrayBuffer();
        const binary = new Uint8Array(arrayBuffer);
        const parseResult = parseCsvInputFromBinary(binary);

        if (parseResult.ok) {
          const { strategyLabels1, strategyLabels2, payoffMatrix } =
            parseResult.data;

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
            title: "CSVの読み込みに失敗しました",
            description: parseResult.message,
            type: "error",
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        toaster.create({
          title: "CSVの読み込みに失敗しました",
          description: message,
          type: "error",
        });
      }
    }, [setInputUI]);

    const handleDownload = useCallback(() => {
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
    }, [inputUI]);

    const handleCalculate = useCallback(() => {
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
    }, [inputUI, onCalculate]);

    const applyPreset = useCallback((presetKey: PresetKey) => {
      const preset = presets[presetKey];
      if (!preset) {
        toaster.create({
          title: "プリセットの読み込みに失敗しました",
          type: "error",
        });
        return;
      }
      const snapshot = createPresetSnapshot(presetKey);
      setInputUI(snapshot);
      toaster.create({
        title: `プリセット ${preset.label} を適用しました`,
        type: "success",
      });
    }, [setInputUI]);

    const handleShare = useCallback(() => {
      try {
        const shareUrl = createShareUrl(inputUI, { result });
        const text = encodeURIComponent(
          "ゲーム入力と結果を共有します #yomiNash"
        );
        const intent = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(intent, "_blank", "noopener,noreferrer");
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        toaster.create({
          title: "シェアURL生成に失敗しました",
          description: message,
          type: "error",
        });
      }
    }, [inputUI, result]);

    const handleReset = useCallback(() => {
      setInputUI(createDefaultGameInputUI());
      onReset?.();
      toaster.create({ title: "リセットしました", type: "success" });
    }, [onReset, setInputUI]);

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
