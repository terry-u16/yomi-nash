import type { GameResult, MixedStrategy } from "@/types/game";
import { Slider } from "@chakra-ui/react";

interface Props {
  strategy: MixedStrategy;
  colorpalette?: string;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
  generateNewResult: (
    prev: GameResult,
    newStrategy: MixedStrategy
  ) => GameResult;
}

const StrategySlider: React.FC<Props> = ({
  strategy,
  colorpalette,
  generateNewResult,
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
          const newStrategy = strategy.map((entry, idx) => ({
            ...entry,
            probability: (newProbs[idx + 1] - newProbs[idx]) / 100,
          }));

          return generateNewResult(prev, newStrategy);
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
};

export default StrategySlider;
