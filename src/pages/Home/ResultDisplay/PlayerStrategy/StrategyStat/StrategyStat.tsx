import type { MixedStrategyEntry } from "@/types/game";
import { Box, FormatNumber, Stat } from "@chakra-ui/react";
import React from "react";
import ProbabilityProgress from "./ProbabilityProgress";

interface Props {
  strategy: MixedStrategyEntry;
  index: number;
  expectedPayoff: number;
  colorpalette?: string;
}

const StrategyStat: React.FC<Props> = React.memo(
  ({ strategy, expectedPayoff, colorpalette }: Props) => {
    return (
      <Box w={{ base: "100%", sm: "30%" }}>
        <Stat.Root>
          <Stat.Label>{strategy.label}</Stat.Label>
          <Stat.ValueText>
            <FormatNumber
              value={strategy.probability}
              maximumFractionDigits={2}
              minimumFractionDigits={2}
              style="percent"
            />
          </Stat.ValueText>
          <Stat.HelpText mb={2}>
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
          </Stat.HelpText>
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
