import { useColorMode } from "@/components/ui/color-mode";
import { Box, FormatNumber, Table, Text, useToken } from "@chakra-ui/react";
import chroma from "chroma-js";
import React from "react";

interface Props {
  prob: number;
  payoff: number;
  maxAbsPayoff: number;
}

const SumCell: React.FC<Props> = React.memo(
  ({ prob, payoff, maxAbsPayoff }: Props) => {
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

    const percentage = prob * 100;

    return (
      <Table.Cell position="relative" p={0}>
        <Box>
          <Box
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            width={`${percentage}%`}
            bg={payoffToColor(payoff, maxAbsPayoff)}
            borderRadius="sm"
            zIndex="base"
            rounded="none"
            my={1}
            display="flex"
            justifyContent="space-between"
          />
          <Box
            position="relative"
            zIndex="docked"
            px={2}
            fontSize="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text textAlign="left">
              <FormatNumber
                value={payoff}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
              />
            </Text>
            <Text textAlign="right">
              <FormatNumber
                value={prob}
                style="percent"
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </Text>
          </Box>
        </Box>
      </Table.Cell>
    );
  }
);

export default SumCell;
