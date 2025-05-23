import { Box, Heading, Stack } from "@chakra-ui/react";
import type { GameResult, MixedStrategy } from "../../../types/game";
import React, { useCallback, useMemo } from "react";
import {
  evaluateMixedStrategyMatchup,
  evaluatePureStrategies,
} from "@/utils/solveGameInput";
import ExpectedStat from "./ExpectedStat";
import ProbabilityTable from "./ProbabilityTable/ProbabilityTable";
import PlayerStrategy from "./PlayerStrategy/PlayerStrategy";

interface Props {
  result: GameResult;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
}
const ResultDisplay: React.FC<Props> = React.memo(
  ({ result, setResult }: Props) => {
    const maxAbsPayoff = Math.max(
      ...result.payoffMatrix12.flat().map((v) => Math.abs(v)),
      1e-6
    );

    const expectedP1 = useMemo(
      () =>
        evaluateMixedStrategyMatchup(
          result.payoffMatrix12,
          result.player1Strategy,
          result.player2Strategy
        ),
      [result.payoffMatrix12, result.player1Strategy, result.player2Strategy]
    );

    const expectedP1All = useMemo(
      () =>
        evaluatePureStrategies(result.payoffMatrix12, result.player2Strategy),
      [result.payoffMatrix12, result.player2Strategy]
    );

    const expectedP2All = useMemo(
      () =>
        evaluatePureStrategies(result.payoffMatrix21, result.player1Strategy),
      [result.payoffMatrix21, result.player1Strategy]
    );

    const generateNewResult1 = useCallback(
      (prev: GameResult, newStrategy: MixedStrategy) => {
        return {
          ...prev,
          player1Strategy: newStrategy,
        };
      },
      []
    );

    const generateNewResult2 = useCallback(
      (prev: GameResult, newStrategy: MixedStrategy) => {
        return {
          ...prev,
          player2Strategy: newStrategy,
        };
      },
      []
    );

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          計算結果
        </Heading>
        <Stack mb={6} gap={10}>
          <ExpectedStat value={expectedP1} maxAbsPayoff={maxAbsPayoff} />
          <Stack gap={8}>
            <PlayerStrategy
              playerName="Player 1"
              strategy={result.player1Strategy}
              expectedPayoff={expectedP1All}
              colorpalette="red"
              setResult={setResult}
              generateNewResult={generateNewResult1}
            />
            <PlayerStrategy
              playerName="Player 2"
              strategy={result.player2Strategy}
              expectedPayoff={expectedP2All}
              colorpalette="blue"
              setResult={setResult}
              generateNewResult={generateNewResult2}
            />
          </Stack>
          <ProbabilityTable result={result} maxAbsPayoff={maxAbsPayoff} />
        </Stack>
      </Box>
    );
  }
);

export default ResultDisplay;
