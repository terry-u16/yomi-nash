import type { MixedStrategyEntry } from "@/types/game";
import { Badge, Box, FormatNumber, Stat } from "@chakra-ui/react";
import React from "react";
import ProbabilityProgress from "./ProbabilityProgress";

interface Props {
  strategy: MixedStrategyEntry;
  index: number;
  expectedPayoff: number;
  bestExpectedPayoff: number;
  colorpalette?: string;
}

const StrategyStat: React.FC<Props> = React.memo(
  ({ strategy, expectedPayoff, bestExpectedPayoff, colorpalette }: Props) => {
    const expectedPayoffColor =
      Math.abs(expectedPayoff - bestExpectedPayoff) < 1e-6
        ? colorpalette
        : "gray";

    return (
      <Box w={{ base: "100%", sm: "30%" }}>
        <Stat.Root>
          <Stat.Label>{strategy.label}</Stat.Label>
          <Stat.ValueText alignItems="baseline">
            <FormatNumber
              value={strategy.probability * 100}
              maximumFractionDigits={2}
              minimumFractionDigits={2}
            />
            <Stat.ValueUnit>%</Stat.ValueUnit>
          </Stat.ValueText>
          <Badge mb={2} variant="plain" px={0} colorPalette={expectedPayoffColor}>
            期待値:{" "}
            <FormatNumber
              value={(() => {
                // -epsが-0と表示されることを避ける
                const exp = Math.round(expectedPayoff * 100) / 100;
                return exp === 0 ? 0 : exp;
              })()}
              maximumFractionDigits={2}
              minimumFractionDigits={0}
            />
          </Badge>
          <ProbabilityProgress
            probability={strategy.probability}
            colorpalette={colorpalette}
          />
        </Stat.Root>
      </Box>
    );
  }
);

export default StrategyStat;
