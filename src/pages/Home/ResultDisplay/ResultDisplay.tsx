import { Box, Heading, Separator, Stack } from "@chakra-ui/react";
import type { GameResult, MixedStrategy } from "../../../types/game";
import React, { useCallback } from "react";
import {
  evaluateMixedStrategyMatchup,
  evaluatePureStrategies,
  transposeMatrix,
} from "@/utils/solveGameInput";
import ExpectedStat from "./ExpectedStat";
import ResultTable from "./ResultTable/ResultTable";
import PlayerStrategy from "./PlayerStrategy/PlayerStrategy";
import { useTranslation } from "react-i18next";

interface Props {
  result: GameResult;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
}
const ResultDisplay: React.FC<Props> = React.memo(
  ({ result, setResult }: Props) => {
    const { t } = useTranslation();
    const player1Label = t("common.player1");
    const player2Label = t("common.player2");
    const maxAbsPayoff = Math.max(
      ...result.payoffMatrix.flat().map((v) => Math.abs(v)),
      1e-6
    );

    const expectedP1 = evaluateMixedStrategyMatchup(
      result.payoffMatrix,
      result.player1Strategy,
      result.player2Strategy
    );

    const expectedP1All = evaluatePureStrategies(
      result.payoffMatrix,
      result.player2Strategy
    );

    const expectedP2All = evaluatePureStrategies(
      transposeMatrix(result.payoffMatrix),
      result.player1Strategy
    );

    const strategyGetter1 = useCallback(
      (prev: GameResult) => prev.player1Strategy,
      []
    );

    const strategyGetter2 = useCallback(
      (prev: GameResult) => prev.player2Strategy,
      []
    );

    const strategySetter1 = useCallback(
      (prev: GameResult, newStrategy: MixedStrategy) => {
        return {
          ...prev,
          player1Strategy: newStrategy,
        };
      },
      []
    );

    const strategySetter2 = useCallback(
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
          {t("home.resultDisplay.heading")}
        </Heading>
        <Stack mb={2} gap={4}>
          <ExpectedStat
            value={expectedP1}
            maxAbsPayoff={maxAbsPayoff}
            playerLabel={player1Label}
          />
          <Separator />
          <Stack gap={4} direction={{ base: "column", md: "row" }}>
            <Box flex={1}>
              <PlayerStrategy
                playerName={player1Label}
                strategy={result.player1Strategy}
                expectedPayoff={expectedP1All}
                inverted={false}
                colorpalette="red"
                setResult={setResult}
                strategyGetter={strategyGetter1}
                strategySetter={strategySetter1}
              />
            </Box>
            <Box flex={1}>
              <PlayerStrategy
                playerName={player2Label}
                strategy={result.player2Strategy}
                expectedPayoff={expectedP2All}
                inverted={true}
                colorpalette="blue"
                setResult={setResult}
                strategyGetter={strategyGetter2}
                strategySetter={strategySetter2}
              />
            </Box>
          </Stack>
          <Separator />
          <ResultTable result={result} maxAbsPayoff={maxAbsPayoff} />
        </Stack>
      </Box>
    );
  }
);

export default ResultDisplay;
