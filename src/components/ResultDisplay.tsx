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
  Badge,
} from "@chakra-ui/react";
import type { GameResult } from "../types/game";
import type React from "react";
import chroma from "chroma-js";
import { useColorMode } from "./ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TbArrowDown,
  TbArrowDownRight,
  TbArrowsExchange,
  TbArrowUp,
  TbArrowUpRight,
} from "react-icons/tb";

interface Props {
  result: GameResult | null;
}

interface ExpectedStatProps {
  value: number;
  maxAbsPayoff: number;
}

interface PlayerStatProps {
  strategy: { label: string; probability: number }[];
  colorpalette?: string;
}

const ExpectedStat: React.FC<ExpectedStatProps> = ({
  value,
  maxAbsPayoff,
}: ExpectedStatProps) => {
  const normalizedValue = value / maxAbsPayoff;
  let colorPalette: string;
  let badgeText: string;
  let icon: React.ReactNode;

  if (normalizedValue > 0.15) {
    colorPalette = "red";
    badgeText = "有利";
    icon = <TbArrowUp />;
  } else if (normalizedValue > 0.02) {
    colorPalette = "red";
    badgeText = "微有利";
    icon = <TbArrowUpRight />;
  } else if (normalizedValue < -0.15) {
    colorPalette = "blue";
    badgeText = "不利";
    icon = <TbArrowDown />;
  } else if (normalizedValue < -0.02) {
    colorPalette = "blue";
    badgeText = "微不利";
    icon = <TbArrowDownRight />;
  } else {
    colorPalette = "gray";
    badgeText = "互角";
    icon = <TbArrowsExchange />;
  }

  return (
    <Stat.Root size="lg">
      <Stat.ValueText>
        <FormatNumber
          value={value}
          maximumFractionDigits={2}
          minimumFractionDigits={0}
        />
      </Stat.ValueText>
      <Badge colorPalette={colorPalette} variant="plain" px="0">
        {icon} {badgeText}
      </Badge>
    </Stat.Root>
  );
};

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

  const expectedP1 = result.player1Strategy.map((_, i) => {
    const expected = result.payoffMatrix[i].reduce(
      (acc, payoff, j) => acc + payoff * result.player2Strategy[j].probability,
      0
    );
    return Math.round(expected * 100) / 100;
  });

  const expectedP2 = result.player2Strategy.map((_, j) => {
    const expected = result.payoffMatrix.reduce(
      (acc, payoff, i) =>
        acc + payoff[j] * result.player1Strategy[i].probability,
      0
    );
    return Math.round(expected * 100) / 100;
  });

  return (
    <Stack mb={6} gap={8}>
      <Box>
        <Heading size="lg" as="h3" mb={2}>
          Player 1 期待値
        </Heading>
        <ExpectedStat
          value={result.expectedPayoff}
          maxAbsPayoff={maxAbsPayoff}
        />
      </Box>
      <Stack gap={6}>
        <Box>
          <Heading size="lg" as="h3" mb={2}>
            Player 1 戦略
          </Heading>
          <Box>
            <PlayerStat strategy={result.player1Strategy} colorpalette="red" />
          </Box>
        </Box>
        <Box>
          <Heading size="lg" as="h3" mb={2}>
            Player 2 戦略
          </Heading>
          <PlayerStat strategy={result.player2Strategy} colorpalette="blue" />
        </Box>
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
                    <Tooltip
                      content={`選択確率: ${(entry.probability * 100).toFixed(2)}% / 期待値: ${expectedP2[j]}`}
                      openDelay={500}
                      closeDelay={500}
                    >
                      <Text truncate>{entry.label}</Text>
                    </Tooltip>
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {result.player1Strategy.map((row, i) => (
                <Table.Row key={`row_${i + 1}`}>
                  <Table.Cell>
                    <Tooltip
                      content={`選択確率: ${(row.probability * 100).toFixed(2)}% / 期待値: ${expectedP1[i]}`}
                      openDelay={500}
                      closeDelay={500}
                    >
                      <Text truncate>{row.label}</Text>
                    </Tooltip>
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
