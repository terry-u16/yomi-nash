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
          to mix each option as well as the expected outcome.
        </Text>
        <Stack>
          <Heading size="md" as="h3">
            Player 1 expected value
          </Heading>
          <Text>
            This number represents Player 1's average payoff. Positive values
            favor Player 1, negative values favor Player 2.
          </Text>
          <ExpectedValueOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Adjusting strategies
          </Heading>
          <Text>
            The “Option Mix” chart lets you drag sliders to tweak probabilities.
            It's handy when you want to see how outcomes shift as you deviate
            from the equilibrium.
          </Text>
          <Text>
            The “Expected Value” bar chart underneath shows the average payoff
            when a player commits to each option. Taller bars signal better
            outcomes for that player.
          </Text>
          <StrategyAdjustmentOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Detailed results table
          </Heading>
          <Text>
            The “Detailed Results” table augments the original grid with row and
            column averages and a color-coded overall average.
          </Text>
          <ResultTableOverviewMock />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HelpEnResultsSection;
