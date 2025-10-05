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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
          title: t("home.tableControls.csvLoadSuccess"),
          type: "success",
        });
      } else {
        toaster.create({
          title: t("home.tableControls.csvLoadError"),
          description: parseResult.message,
          type: "error",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toaster.create({
        title: t("home.tableControls.csvLoadError"),
        description: message,
        type: "error",
      });
    }
  }, [setInputUI, t]);

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
      title: t("home.tableControls.csvDownloading"),
    });
  }, [inputUI, t]);

  const handleCalculate = useCallback(() => {
    const result = parseGameInputUI(inputUI);
    if (result.ok) {
      onCalculate(result.data);
    } else {
      toaster.create({
        title: t("home.tableControls.inputError"),
        description: result.errors
          .map((err) =>
            t("home.tableControls.inputErrorPosition", {
              row: err.row + 1,
              col: err.col + 1,
            })
          )
          .join(", "),
        type: "error",
      });
    }
  }, [inputUI, onCalculate, t]);

  const applyPreset = useCallback((presetKey: PresetKey) => {
    const preset = presets[presetKey];
    if (!preset) {
      toaster.create({
        title: t("home.tableControls.presetError"),
        type: "error",
      });
      return;
    }
    const snapshot = createPresetSnapshot(presetKey);
    setInputUI(snapshot);
    toaster.create({
      title: t("home.tableControls.presetApplied", {
        label: t(preset.labelKey),
      }),
      type: "success",
    });
  }, [setInputUI, t]);

  const handleShare = useCallback(() => {
    try {
      const shareUrl = createShareUrl(inputUI, { result });
      const text = encodeURIComponent(t("home.tableControls.shareTweet"));
      const intent = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        shareUrl
      )}`;
      window.open(intent, "_blank", "noopener,noreferrer");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      toaster.create({
        title: t("home.tableControls.shareError"),
        description: message,
        type: "error",
      });
    }
  }, [inputUI, result, t]);

  const handleReset = useCallback(() => {
    setInputUI(createDefaultGameInputUI());
    onReset?.();
    toaster.create({ title: t("home.tableControls.resetSuccess"), type: "success" });
  }, [onReset, setInputUI, t]);

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
