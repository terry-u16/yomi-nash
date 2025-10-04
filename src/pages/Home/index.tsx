import PayoffTable from "@/pages/Home/PayoffTable/PayoffTable";
import ResultDisplay from "@/pages/Home/ResultDisplay/ResultDisplay";
import TableControls from "@/pages/Home/TableControls/TableControls";
import { toaster } from "@/components/ui/toaster";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import { solveGame } from "@/utils/solveGameInput";
import { Stack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { parseGameInputUIFromSearchParams } from "@/lib/parser/parseGameInputUI";
import { parseGameResultFromSearchParams } from "@/lib/parser/parseGameResult";
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

  // 初回マウント時にURLパラメータから状態を復元
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const inputUIParsed = parseGameInputUIFromSearchParams(searchParams);
    if (inputUIParsed) {
      if (inputUIParsed.ok) {
        setInputUI(inputUIParsed.data);
        // inputUIを復元できた場合のみresultも試行
        const resultParsed = parseGameResultFromSearchParams(
          searchParams,
          inputUIParsed.data
        );
        if (resultParsed) {
          if (resultParsed.ok) {
            setResult(resultParsed.data);
          } else {
            toaster.create({
              title: "結果の復元に失敗しました",
              description: resultParsed.error,
              type: "warning",
            });
          }
        }
        toaster.create({
          title: "共有データを読み込みました",
          type: "success",
        });
      } else {
        toaster.create({
          title: "入力の復元に失敗しました",
          description: inputUIParsed.error,
          type: "error",
        });
      }
    }
  }, [setInputUI, setResult]);

  return (
    <Stack gap={4} mb={4}>
      <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      <TableControls
        inputUI={inputUI}
        setInputUI={setInputUI}
        onCalculate={onCalcualte}
        result={result}
      />
      {result === null || (
        <ResultDisplay result={result} setResult={setResult} />
      )}
    </Stack>
  );
};

export default Home;
