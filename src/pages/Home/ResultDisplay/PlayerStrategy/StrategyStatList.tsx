import type { MixedStrategy } from "@/types/game";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import StrategyStat from "./StrategyStat/StrategyStat";

interface Props {
  strategy: MixedStrategy;
  expectedPayoff: number[];
  colorpalette?: string;
}

const StrategyStatList: React.FC<Props> = React.memo(
  ({ strategy, expectedPayoff, colorpalette }: Props) => {
    return (
      <Box w="100%">
        <Flex wrap="wrap" gap={4}>
          {strategy.map((entry, idx) => (
            <StrategyStat
              strategy={entry}
              index={idx}
              expectedPayoff={expectedPayoff[idx]}
              colorpalette={colorpalette}
              key={idx}
            />
          ))}
        </Flex>
      </Box>
    );
  }
);

export default StrategyStatList;
