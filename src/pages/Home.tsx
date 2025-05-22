import PayoffTable from "@/components/PayoffTable";
import ResultDisplay from "@/components/ResultDisplay";
import TableControls from "@/components/TableControls";
import { toaster } from "@/components/ui/toaster";
import type { GameInput, GameInputUI, GameResult } from "@/types/game";
import { solveGame } from "@/utils/solveGameInput";
import { Stack } from "@chakra-ui/react";
import { useCallback } from "react";
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

  return (
    <Stack gap={4}>
      <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      <TableControls
        inputUI={inputUI}
        setInputUI={setInputUI}
        onCalculate={onCalcualte}
      />
      {result === null || (
        <ResultDisplay result={result} setResult={setResult} />
      )}
    </Stack>
  );
};

export default Home;
