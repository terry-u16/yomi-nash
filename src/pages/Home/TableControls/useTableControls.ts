import { useCallback, useRef } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { toaster } from "@/components/ui/toaster";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import {
  createDefaultGameInputUI,
  createPresetSnapshot,
  presets,
  type PresetKey,
} from "@/lib/presets";
import { clampGameInputUI } from "@/utils/clampGameInput";
import { createShareUrl } from "@/utils/createShareUrl";
import { parseGameInputUI } from "@/utils/parseGameInput";
import {
  generateCsvFromGameInputUI,
  parseCsvInputFromBinary,
} from "@/utils/parseCsvInput";

interface UseTableControlsParams {
  inputUI: GameInputUI;
  setInputUI: Dispatch<SetStateAction<GameInputUI>>;
  onCalculate: (parsed: GameInput) => void | Promise<void>;
  result?: GameResult | null;
  onReset?: () => void;
}

export const useTableControls = ({
  inputUI,
  setInputUI,
  onCalculate,
  result,
  onReset,
}: UseTableControlsParams) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow selecting the same file repeatedly
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const binary = new Uint8Array(arrayBuffer);
      const parseResult = parseCsvInputFromBinary(binary);

      if (parseResult.ok) {
        const { strategyLabels1, strategyLabels2, payoffMatrix } = parseResult.data;

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
      const text = encodeURIComponent("ゲーム入力と結果を共有します #yomiNash");
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

  return {
    fileInputRef,
    handleUpload,
    handleDownload,
    handleCalculate,
    applyPreset,
    handleShare,
    handleReset,
  };
};

export type UseTableControlsReturn = ReturnType<typeof useTableControls>;
