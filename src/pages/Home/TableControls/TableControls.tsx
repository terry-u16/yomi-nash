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
import type { GameInput, GameInputUI, GameResult } from "../../../types/game";
import {
  generateCsvFromGameInputUI,
  parseCsvInputFromBinary,
} from "@/utils/parseCsvInput";
import {
  TbAdjustments,
  TbCalculator,
  TbFileDownload,
  TbFileUpload,
  TbShare3,
} from "react-icons/tb";
import { parseGameInputUI } from "@/utils/parseGameInput";
import { presets } from "@/presets";
import { clampGameInputUI } from "@/utils/clampGameInput";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void;
  result?: GameResult | null;
}

const TableControls = React.memo(
  ({ inputUI, setInputUI, onCalculate, result }: Props) => {
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

    const handleShare = () => {
      try {
        const params = new URLSearchParams();
        params.set("gameInputUI", JSON.stringify(inputUI));
        if (result) {
          params.set(
            "gameResult",
            JSON.stringify({
              player1Strategy: result.player1Strategy,
              player2Strategy: result.player2Strategy,
              payoffMatrix: result.payoffMatrix,
            })
          );
        }
        const base = `${window.location.origin}${window.location.pathname}`;
        const shareUrl = `${base}?${params.toString()}`;
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
          <Button variant="surface" onClick={handleShare}>
            <TbShare3 /> シェア
          </Button>
        </Flex>
      </Box>
    );
  }
);

export default TableControls;
