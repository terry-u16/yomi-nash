import type { MixedStrategy } from "@/types/game";
import { Box, Flex, FormatNumber, Progress, Stat } from "@chakra-ui/react";
import React from "react";

interface Props {
  strategy: MixedStrategy;
  expectedPayoff: number[];
  colorpalette?: string;
}

const PlayerStat: React.FC<Props> = React.memo(
  ({ strategy, expectedPayoff, colorpalette }: Props) => {
    return (
      <Box w="100%">
        <Flex wrap="wrap" gap={4}>
          {strategy.map((entry, idx) => (
            <Box key={idx} w={{ base: "100%", sm: "30%" }}>
              <Stat.Root>
                <Stat.Label>{entry.label}</Stat.Label>
                <Stat.ValueText>
                  <FormatNumber
                    value={entry.probability}
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
                      const exp = Math.round(expectedPayoff[idx] * 100) / 100;
                      return exp === 0 ? 0 : exp;
                    })()}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                  />
                </Stat.HelpText>
                <Progress.Root
                  value={entry.probability * 100}
                  colorPalette={colorpalette}
                >
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Stat.Root>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  }
);

export default PlayerStat;
