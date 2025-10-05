import PayoffTable from "@/pages/Home/PayoffTable/PayoffTable";
import ResultDisplay from "@/pages/Home/ResultDisplay/ResultDisplay";
import TableControls from "@/pages/Home/TableControls/TableControls";
import { toaster } from "@/components/ui/toaster";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import { solveGame } from "@/utils/solveGameInput";
import { Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { restoreFromLocation } from "@/lib/persistence/restoreFromLocation";
import { persistToStorage } from "@/lib/persistence/persistToStorage";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LayoutContext {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  result: GameResult | null;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
}

const Home: React.FC = () => {
  const { inputUI, setInputUI, result, setResult } =
    useOutletContext<LayoutContext>();
  const { t } = useTranslation();

  const handleCalculate = useCallback(
    async (parsed: GameInput) => {
      try {
        const solved = await solveGame(parsed);
        setResult(solved);
        toaster.create({
          title: t("home.toasts.calcSuccess"),
          type: "success",
        });
      } catch (error) {
        console.error(error);
        const description =
          error instanceof Error ? error.message : String(error);
        toaster.create({
          title: t("home.toasts.calcError"),
          description,
          type: "error",
        });
      }
    },
    [setResult, t]
  );

  // 初回マウント時にURL から復元（localStorage は Main 初期化で処理済み）
  const isInitializedRef = useRef(false);
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const outcome = restoreFromLocation(window.location.search);

    switch (outcome.status) {
      case "schema-version-mismatch": {
        toaster.create({
          title: t("home.toasts.restore.schemaMismatch"),
          type: "error",
        });
        return;
      }
      case "input-error": {
        toaster.create({
          title: t("home.toasts.restore.inputError"),
          description: outcome.message,
          type: "error",
        });
        return;
      }
      case "success": {
        setInputUI(outcome.inputUI);
        if (outcome.result) {
          setResult(outcome.result);
        }
        if (outcome.resultErrorMessage) {
          toaster.create({
            title: t("home.toasts.restore.resultError"),
            description: outcome.resultErrorMessage,
            type: "warning",
          });
        }
        toaster.create({
          title: t("home.toasts.restore.loaded"),
          type: "success",
        });
        return;
      }
      case "none": {
        return;
      }
      default: {
        return;
      }
    }
  }, [setInputUI, setResult, t]);

  // 変更があればlocalStorageへ保存
  useEffect(() => {
    persistToStorage({ inputUI, result });
  }, [inputUI, result]);

  return (
    <Stack gap={4} mb={4}>
      <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      <TableControls
        inputUI={inputUI}
        setInputUI={setInputUI}
        onCalculate={handleCalculate}
        result={result}
        onReset={() => setResult(null)}
      />
      {result === null || (
        <ResultDisplay result={result} setResult={setResult} />
      )}
    </Stack>
  );
};

export default Home;
