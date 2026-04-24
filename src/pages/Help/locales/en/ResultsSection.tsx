import { Heading, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import {
  ExpectedValueOverviewMock,
  ResultTableOverviewMock,
  StrategyAdjustmentOverviewMock,
} from "../shared";

const HelpEnResultsSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        Reading the results
      </Heading>
      <Stack gap={10}>
        <Text>
          After a calculation finishes, the “Results” card appears and shows how
          often each option should be chosen as well as the expected outcome.
        </Text>
        <Stack>
          <Heading size="md" as="h3">
            Player 1 expected value
          </Heading>
          <Text>
            This represents Player 1's average payoff. Positive values favor
            Player 1, while negative values mean Player 1 is disadvantaged
            (Player 2 is favored).
          </Text>
          <ExpectedValueOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Strategy analysis
          </Heading>
          <Text>
            This area shows how often each player chooses each option, and the
            expected value of choosing each option.
          </Text>
          <Text>
            Drag the sliders left or right to adjust option probabilities. This
            is useful when you want to check how the results change as the mix
            changes.
          </Text>
          <Text>
            The “Expected Value” chart shows the expected value of choosing each
            option. Bars extending upward represent favorable situations for
            that player, while bars extending downward represent unfavorable
            situations.
          </Text>
          <StrategyAdjustmentOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Detailed results table
          </Heading>
          <Text>
            The “Detailed Results” table shows the probability of each option
            pair being chosen and the result for that pair.
          </Text>
          <Text>
            The bar color becomes redder for situations that favor Player 1 and
            bluer for situations that favor Player 2. The bar length represents
            the probability that the option pair is chosen.
          </Text>
          <ResultTableOverviewMock />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HelpEnResultsSection;
