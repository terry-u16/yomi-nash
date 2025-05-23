import { useColorMode } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import type { GameResult } from "@/types/game";
import {
  Box,
  Text,
  FormatNumber,
  Heading,
  Table,
  useToken,
} from "@chakra-ui/react";
import chroma from "chroma-js";
import React from "react";

interface Props {
  result: GameResult;
  maxAbsPayoff: number;
}

const ProbabilityTable: React.FC<Props> = React.memo(
  ({ result, maxAbsPayoff }: Props) => {
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

    return (
      <Box>
        <Heading size="lg" as="h3" mb={2}>
          発生確率一覧
        </Heading>
        <Table.ScrollArea>
          <Table.Root
            variant="outline"
            size="sm"
            style={{ tableLayout: "fixed" }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w="150px">
                  Player 1 ＼ Player 2
                </Table.ColumnHeader>
                {result.player2Strategy.map((entry, j) => (
                  <Table.ColumnHeader w="150px" key={`header_${j + 1}`}>
                    <Text truncate>{entry.label}</Text>
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {result.player1Strategy.map((row, i) => (
                <Table.Row key={`row_${i + 1}`}>
                  <Table.Cell>
                    <Text truncate>{row.label}</Text>
                  </Table.Cell>
                  {result.player2Strategy.map((col, j) => {
                    const prob = row.probability * col.probability;
                    const percentage = prob * 100;
                    return (
                      <Table.Cell
                        key={`cell_${i}_${j}`}
                        position="relative"
                        p={0}
                      >
                        <Tooltip
                          content={`${row.label} x ${col.label} : ${result.payoffMatrix12[i][j]}`}
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
                              bg={payoffToColor(
                                result.payoffMatrix12[i][j],
                                maxAbsPayoff
                              )}
                              borderRadius="sm"
                              zIndex="base"
                              rounded="none"
                              my={1}
                            />
                            <Box
                              position="relative"
                              zIndex="docked"
                              px={2}
                              fontSize="sm"
                            >
                              <FormatNumber
                                value={row.probability * col.probability}
                                style="percent"
                                maximumFractionDigits={2}
                                minimumFractionDigits={2}
                              />
                            </Box>
                          </Box>
                        </Tooltip>
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell>
                  <Text truncate>TODO: 合計</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    );
  }
);

export default ProbabilityTable;
