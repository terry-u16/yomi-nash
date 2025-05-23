import { useColorMode } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import type { MixedStrategyEntry } from "@/types/game";
import { Box, FormatNumber, Table, useToken } from "@chakra-ui/react";
import chroma from "chroma-js";
import React from "react";

interface Props {
  strategy1: MixedStrategyEntry;
  strategy2: MixedStrategyEntry;
  payoff: number;
  maxAbsPayoff: number;
}

const ProbabilityCell: React.FC<Props> = React.memo(
  ({ strategy1, strategy2, payoff, maxAbsPayoff }: Props) => {
    const { colorMode } = useColorMode();
    const [lightGray, lightRed, lightBlue, darkGray, darkRed, darkBlue] =
      useToken("colors", [
        "gray.400",
        "red.600",
        "blue.600",
        "gray.700",
        "red.600",
        "blue.600",
      ]);
    const [gray, red, blue] =
      colorMode === "light"
        ? [lightGray, lightRed, lightBlue]
        : [darkGray, darkRed, darkBlue];

    const payoffToColor = (payoff: number, maxAbs: number): string => {
      const t = Math.max(-1, Math.min(1, payoff / maxAbs));
      const scale = chroma.scale([blue, gray, red]).domain([-1, 0, 1]);
      return scale(t).hex();
    };

    const prob = strategy1.probability * strategy2.probability;
    const percentage = prob * 100;

    return (
      <Table.Cell position="relative" p={0}>
        <Tooltip
          content={`${strategy1.label} x ${strategy2.label} : ${payoff}`}
          openDelay={500}
          closeDelay={500}
        >
          <Box>
            <Box
              position="absolute"
              top={0}
              bottom={0}
              right={0}
              width={`${percentage.toFixed(2)}%`}
              bg={payoffToColor(payoff, maxAbsPayoff)}
              borderRadius="sm"
              zIndex="base"
              rounded="none"
              my={1}
            />
            <Box position="relative" zIndex="docked" px={2} fontSize="sm">
              <FormatNumber
                value={strategy1.probability * strategy2.probability}
                style="percent"
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </Box>
          </Box>
        </Tooltip>
      </Table.Cell>
    );
  }
);

export default ProbabilityCell;
