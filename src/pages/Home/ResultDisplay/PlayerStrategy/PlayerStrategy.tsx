import type { GameResult, MixedStrategy } from "@/types/game";
import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import ProbChart from "./ProbChart";
import ExpectedChart from "./ExpectedChart";
import { useTranslation } from "react-i18next";

interface Props {
  playerName: string;
  strategy: MixedStrategy;
  expectedPayoff: number[];
  inverted: boolean;
  colorpalette: string;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
  strategyGetter: (prev: GameResult) => MixedStrategy;
  strategySetter: (prev: GameResult, stragety: MixedStrategy) => GameResult;
}

const PlayerStrategy: React.FC<Props> = React.memo(
  ({
    playerName,
    strategy,
    expectedPayoff,
    inverted,
    colorpalette,
    setResult,
    strategyGetter,
    strategySetter,
  }: Props) => {
    const { t } = useTranslation();
    const strategyLabels = strategy.map((entry) => entry.label);

    return (
      <Stack mb={-4}>
        <Heading size="lg" as="h3">
          {t("home.resultDisplay.playerStrategy", { player: playerName })}
        </Heading>
        <ProbChart
          strategy={strategy}
          colorpalette={colorpalette}
          setResult={setResult}
          strategyGetter={strategyGetter}
          strategySetter={strategySetter}
        />
        <ExpectedChart
          strategyLabels={strategyLabels}
          expectedPayoff={expectedPayoff}
          inverted={inverted}
          colorpalette={colorpalette}
        />
      </Stack>
    );
  }
);

export default PlayerStrategy;
