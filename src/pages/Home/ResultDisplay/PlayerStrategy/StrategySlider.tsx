import type { GameResult, MixedStrategy } from "@/types/game";
import { Slider } from "@chakra-ui/react";
import React from "react";

interface Props {
  strategy: MixedStrategy;
  colorpalette?: string;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
  strategyGetter: (prev: GameResult) => MixedStrategy;
  strategySetter: (prev: GameResult, strategy: MixedStrategy) => GameResult;
}

const StrategySlider: React.FC<Props> = React.memo(
  ({
    strategy,
    colorpalette,
    strategyGetter,
    strategySetter,
    setResult,
  }: Props) => {
    const prefixSum: number[] = [];
    let sum = 0;
    for (const entry of strategy) {
      sum += entry.probability * 100;
      prefixSum.push(sum);
    }

    prefixSum.pop();

    return (
      <Slider.Root
        value={prefixSum}
        onValueChange={(e) =>
          setResult((prev) => {
            if (!prev) return prev;

            const newProbs = [0, ...e.value, 100];
            const newStrategy = [...strategyGetter(prev)];

            for (let i = 0; i < newStrategy.length; i++) {
              const oldProb = newStrategy[i].probability;
              const newProb = (newProbs[i + 1] - newProbs[i]) / 100;

              // 変わったところのみ更新
              if (Math.abs(oldProb - newProb) >= 1e-6) {
                newStrategy[i] = {
                  ...newStrategy[i],
                  probability: newProb,
                };
              }
            }

            return strategySetter(prev, newStrategy);
          })
        }
        colorPalette={colorpalette}
        w="100%"
      >
        <Slider.Label>戦略変更</Slider.Label>
        <Slider.Control>
          <Slider.Track bg={`${colorpalette}.solid`} />
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    );
  }
);

export default StrategySlider;
