import {
  Box,
  Heading,
  FormatNumber,
  Stack,
  Table,
  useToken,
  Text,
} from "@chakra-ui/react";
import type { GameResult } from "../../../types/game";
import React, { useMemo } from "react";
import chroma from "chroma-js";
import { useColorMode } from "../../../components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import {
  evaluateMixedStrategyMatchup,
  evaluatePureStrategies,
} from "@/utils/solveGameInput";
import ExpectedStat from "./ExpectedStat";
import PlayerStat from "./PlayerStat";
import StrategySlider from "./StrategySlider";

interface Props {
  result: GameResult;
  setResult: React.Dispatch<React.SetStateAction<GameResult | null>>;
}
const ResultDisplay: React.FC<Props> = React.memo(
  ({ result, setResult }: Props) => {
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

    const maxAbsPayoff = Math.max(
      ...result.payoffMatrix12.flat().map((v) => Math.abs(v)),
      1e-6
    );

    const payoffToColor = (payoff: number, maxAbs: number): string => {
      const t = Math.max(-1, Math.min(1, payoff / maxAbs));
      const scale = chroma.scale([blue, gray, red]).domain([-1, 0, 1]);
      return scale(t).hex();
    };

    const expectedP1 = useMemo(
      () =>
        evaluateMixedStrategyMatchup(
          result.payoffMatrix12,
          result.player1Strategy,
          result.player2Strategy
        ),
      [result.payoffMatrix12, result.player1Strategy, result.player2Strategy]
    );

    const expectedP1All = useMemo(
      () =>
        evaluatePureStrategies(result.payoffMatrix12, result.player2Strategy),
      [result.payoffMatrix12, result.player2Strategy]
    );

    const expectedP2All = useMemo(
      () =>
        evaluatePureStrategies(result.payoffMatrix21, result.player1Strategy),
      [result.payoffMatrix21, result.player1Strategy]
    );

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          計算結果
        </Heading>
        <Stack mb={6} gap={10}>
          <Box>
            <Heading size="lg" as="h3" mb={1}>
              Player 1 期待値
            </Heading>
            <ExpectedStat value={expectedP1} maxAbsPayoff={maxAbsPayoff} />
          </Box>
          <Stack gap={8}>
            <Stack>
              <Heading size="lg" as="h3">
                Player 1 戦略
              </Heading>
              <Box>
                <PlayerStat
                  strategy={result.player1Strategy}
                  expectedPayoff={expectedP1All}
                  colorpalette="red"
                />
              </Box>
              <Box mt={2}>
                <StrategySlider
                  strategy={result.player1Strategy}
                  colorpalette="red"
                  setResult={setResult}
                  generateNewResult={(prev, newStrategy) => {
                    return {
                      ...prev,
                      player1Strategy: newStrategy,
                    };
                  }}
                />
              </Box>
            </Stack>
            <Stack>
              <Heading size="lg" as="h3" mb={2}>
                Player 2 戦略
              </Heading>
              <Box>
                <PlayerStat
                  strategy={result.player2Strategy}
                  expectedPayoff={expectedP2All}
                  colorpalette="blue"
                />
              </Box>
              <Box mt={2}>
                <StrategySlider
                  strategy={result.player2Strategy}
                  colorpalette="blue"
                  setResult={setResult}
                  generateNewResult={(prev, newStrategy) => {
                    return {
                      ...prev,
                      player2Strategy: newStrategy,
                    };
                  }}
                />
              </Box>
            </Stack>
          </Stack>
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
        </Stack>
      </Box>
    );
  }
);

export default ResultDisplay;
