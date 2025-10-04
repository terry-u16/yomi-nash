import PayoffTable from "@/pages/Home/PayoffTable/PayoffTable";
import ResultDisplay from "@/pages/Home/ResultDisplay/ResultDisplay";
import TableControls from "@/pages/Home/TableControls/TableControls";
import { toaster } from "@/components/ui/toaster";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import { solveGame } from "@/utils/solveGameInput";
import { Stack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { decodeGameInputUI } from "@/lib/parser/parseGameInputUI";
import { decodeGameResult } from "@/lib/parser/parseGameResult";
import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
  result: GameResult | null;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
}

const Home: React.FC = () => {
  const { inputUI, setInputUI, result, setResult } =
    useOutletContext<LayoutContext>();

  const onCalcualte = useCallback(
    (parsed: GameInput) => {
      solveGame(parsed)
        .then((result) => {
          setResult(result);
          toaster.create({
            title: "計算が完了しました",
            type: "success",
          });
        })
        .catch((err) => {
          console.error(err);
          toaster.create({
            title: "計算に失敗しました",
            description: err,
            type: "error",
          });
        });
    },
    [setResult]
  );

  // 初回マウント時にURL から復元（localStorage は Main 初期化で処理済み）
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const versionParam = searchParams.get("schemaVersion");
    if (
      versionParam !== null &&
      Number.parseInt(versionParam, 10) !== DATA_SCHEMA_VERSION
    ) {
      toaster.create({
        title: "共有データのバージョンが古いため読み込めません",
        type: "error",
      });
      return;
    }

    const rawInput = searchParams.get("gameInput");
    const rawResult = searchParams.get("gameResult");
    if (!rawInput) return;
    const inputUIParsed = decodeGameInputUI(rawInput);
    if (!inputUIParsed) return;
    if (!inputUIParsed.ok) {
      toaster.create({ title: "入力の復元に失敗しました", type: "error" });
      return;
    }
    setInputUI(inputUIParsed.data);
    const resultParsed = decodeGameResult(rawResult, inputUIParsed.data);
    if (resultParsed) {
      if (resultParsed.ok) {
        setResult(resultParsed.data);
      } else {
        toaster.create({ title: "結果の復元に失敗しました", type: "warning" });
      }
    }
    toaster.create({ title: "共有データを読み込みました", type: "success" });
  }, [setInputUI, setResult]);

  // 変更があればlocalStorageへ保存
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.inputUI,
        JSON.stringify({
          version: DATA_SCHEMA_VERSION,
          payload: inputUI,
        })
      );
      if (result) {
        localStorage.setItem(
          STORAGE_KEYS.result,
          JSON.stringify({
            version: DATA_SCHEMA_VERSION,
            payload: result,
          })
        );
      } else {
        localStorage.removeItem(STORAGE_KEYS.result);
      }
    } catch (e) {
      console.warn("Failed to save to localStorage", e);
    }
  }, [inputUI, result]);

  return (
    <Stack gap={4} mb={4}>
      <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      <TableControls
        inputUI={inputUI}
        setInputUI={setInputUI}
        onCalculate={onCalcualte}
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
