import PayoffTable from "@/components/PayoffTable";
import ResultDisplay from "@/components/ResultDisplay";
import TableControls from "@/components/TableControls";
import { toaster } from "@/components/ui/toaster";
import type { GameInputUI, GameResult } from "@/types/game";
import { solveGame } from "@/utils/solveGameInput";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
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

  return (
    <Stack gap={4}>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          戦略相性表
        </Heading>
        <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      </Box>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          操作パネル
        </Heading>
        <TableControls
          inputUI={inputUI}
          setInputUI={setInputUI}
          onCalculate={(parsed) => {
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
          }}
        />
      </Box>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          計算結果
        </Heading>
        <ResultDisplay result={result} />
      </Box>
    </Stack>
  );
};

export default Home;
