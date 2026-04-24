import { Alert, Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";

const HelpEnIntroSection: React.FC = () => {
  return (
    <Stack gap={2}>
      <Heading size="xl" as="h2">
        What is this app?
      </Heading>
      <Text>
        This app calculates recommended option probabilities for two-player
        competitive games, from fighting games to rock-paper-scissors.
      </Text>
      <Text>
        Take rock-paper-scissors for example: if you throw rock too often, your
        opponent will notice and punish you with paper. To avoid getting read, a
        solid plan is to pick rock, scissors, and paper randomly with equal
        probability. If both players think the same way, they each end up using
        every hand one third of the time. This app computes strategies that
        avoid letting the opponent exploit your habits in that way.
      </Text>
      <Text>Use it for cases like these:</Text>
      <List.Root ps={4}>
        <List.Item>
          Analyze what mix of options to use in fighting-game neutral,
          set-play, or other matchup situations.
        </List.Item>
        <List.Item>
          Enter an opponent's habits and analyze which of your options has the
          best expected value against them.
        </List.Item>
        <List.Item>
          Calculate the expected value of a situation and decide whether you
          should actively aim for it or avoid it as much as possible instead of
          fighting on the opponent's terms.
        </List.Item>
      </List.Root>
      <Alert.Root status="info" mt={2}>
        <Alert.Indicator />
        <Alert.Description>
          <Text>
            In technical terms, the app solves for the mixed-strategy Nash
            equilibrium of two-player zero-sum games.
          </Text>
          <Text>
            This is the state where, even if both players know each other's
            plan, neither can unilaterally switch strategies to do better.
          </Text>
        </Alert.Description>
      </Alert.Root>
    </Stack>
  );
};

export default HelpEnIntroSection;
