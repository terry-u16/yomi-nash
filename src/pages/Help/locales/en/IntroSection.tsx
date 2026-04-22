import { Alert, Heading, Stack, Text } from "@chakra-ui/react";
import type React from "react";

const HelpEnIntroSection: React.FC = () => {
  return (
    <Stack gap={2}>
      <Heading size="xl" as="h2">
        What is this app?
      </Heading>
      <Text>
        This app calculates what probability mix keeps your options balanced in
        two-player competitive games, from fighting games to
        rock-paper-scissors.
      </Text>
      <Text>
        Take rock-paper-scissors for example: if you throw rock too often, your
        opponent will notice and punish you with paper. To avoid getting read, a
        solid plan is to pick rock, scissors, and paper randomly with equal
        probability. If both players think the same way, they each end up using
        every hand one third of the time. This app computes that kind of stable
        strategy for you.
      </Text>
      <Text>
        Use it whenever you want to answer questions like “what mix of options
        should I choose in a fighting game situation?”
      </Text>
      <Alert.Root status="info" mt={2}>
        <Alert.Indicator />
        <Alert.Description>
          <Text>
            More precisely, the app solves for the mixed-strategy Nash
            equilibrium of two-player zero-sum games - the state where, even if
            both players know each other's plan, neither can unilaterally switch
            strategies to do better.
          </Text>
        </Alert.Description>
      </Alert.Root>
    </Stack>
  );
};

export default HelpEnIntroSection;
