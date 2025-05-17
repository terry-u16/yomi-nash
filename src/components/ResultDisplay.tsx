import {
  Box,
  Heading,
  Stat,
  Flex,
  Progress,
  FormatNumber,
  Stack,
} from "@chakra-ui/react";
import type { GameResult } from "../types/game";
import type React from "react";

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
  if (!result) return null;

  return (
    <Stack mt={8} gap={8}>
      <Box>
        <Heading size="md" as="h3" mb={2}>
          期待値
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
      <Box mb={6}>
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
  );
}
