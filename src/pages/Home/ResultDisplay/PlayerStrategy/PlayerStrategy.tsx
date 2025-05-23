import type { GameResult, MixedStrategy } from "@/types/game";
import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import StrategyStatList from "./StrategyStatList";
import StrategySlider from "./StrategySlider";

interface Props {
  playerName: string;
  strategy: MixedStrategy;
  expectedPayoff: number[];
  colorpalette?: string;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
  strategyGetter: (prev: GameResult) => MixedStrategy;
  strategySetter: (prev: GameResult, stragety: MixedStrategy) => GameResult;
}

const PlayerStrategy: React.FC<Props> = React.memo(
  ({
    playerName,
    strategy,
    expectedPayoff,
    colorpalette,
    setResult,
    strategyGetter,
    strategySetter,
  }: Props) => {
    return (
      <Stack>
        <Heading size="lg" as="h3">
          {`${playerName} 戦略`}
        </Heading>
        <Box>
          <StrategyStatList
            strategy={strategy}
            expectedPayoff={expectedPayoff}
            colorpalette={colorpalette}
          />
        </Box>
        <Box mt={2}>
          <StrategySlider
            strategy={strategy}
            colorpalette={colorpalette}
            setResult={setResult}
            strategyGetter={strategyGetter}
            strategySetter={strategySetter}
          />
        </Box>
      </Stack>
    );
  }
);

export default PlayerStrategy;
