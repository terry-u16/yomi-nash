import {
  Box,
  Heading,
  Stat,
  Flex,
  Progress,
  FormatNumber,
  Stack,
  Table,
  useToken,
  Text,
} from "@chakra-ui/react";
import type { GameResult } from "../types/game";
import type React from "react";
import chroma from "chroma-js";
import { useColorMode } from "./ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  result: GameResult | null;
}

interface PlayerStatProps {
  strategy: { label: string; probability: number }[];
  colorpalette?: string;
}

const PlayerStat: React.FC<PlayerStatProps> = ({
  strategy,
  colorpalette,
}: PlayerStatProps) => {
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
};

export default function ResultDisplay({ result }: Props) {
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

  if (!result) return null;

  const maxAbsPayoff = Math.max(
    ...result.payoffMatrix.flat().map((v) => Math.abs(v)),
    1e-6
  );

  const payoffToColor = (payoff: number, maxAbs: number): string => {
    const t = Math.max(-1, Math.min(1, payoff / maxAbs));
    const scale = chroma.scale([blue, gray, red]).domain([-1, 0, 1]);
    return scale(t).hex();
  };

  return (
    <Stack my={8} gap={10}>
      <Box>
        <Heading size="md" as="h3" mb={2}>
          Player 1 期待値
        </Heading>
        <Stat.Root size="lg">
          <Stat.ValueText>
            <FormatNumber
              value={result.expectedPayoff}
              maximumFractionDigits={2}
              minimumFractionDigits={0}
            />
          </Stat.ValueText>
        </Stat.Root>
      </Box>
      <Stack gap={4}>
        <Box>
          <Heading size="md" as="h3" mb={2}>
            Player 1
          </Heading>
          <Box mt={4}>
            <PlayerStat strategy={result.player1Strategy} colorpalette="red" />
          </Box>
        </Box>
        <Box>
          <Heading size="md" as="h3" mb={2}>
            Player 2
          </Heading>
          <PlayerStat strategy={result.player2Strategy} colorpalette="blue" />
        </Box>
      </Stack>
      <Box>
        <Heading size="md" as="h3" mb={2}>
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
                          content={`${row.label} x ${col.label} : ${result.payoffMatrix[i][j]}`}
                          openDelay={500}
                          closeDelay={100}
                        >
                          <Box>
                            <Box
                              position="absolute"
                              top={0}
                              bottom={0}
                              right={0}
                              width={`${percentage.toFixed(2)}%`}
                              bg={payoffToColor(
                                result.payoffMatrix[i][j],
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
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Stack>
  );
}
