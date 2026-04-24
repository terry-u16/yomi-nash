import { Alert, Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import { PayoffTableOverviewMock } from "../shared";

const HelpEnPayoffTableSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        Payoff table
      </Heading>
      <Text>
        This table records how each Player 1 option interacts with each Player 2
        option.
      </Text>
      <Stack gap={10}>
        <Stack>
          <Heading size="md" as="h3">
            Option names
          </Heading>
          <Text>
            These are the names of the available options. Player 1 options
            appear in red, and Player 2 options appear in blue. Name them
            however you like.
          </Text>
          <PayoffTableOverviewMock mode="names" />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Payoff values
          </Heading>
          <Text>
            Enter a value describing how favorable the outcome is for Player 1
            when Player 1 and Player 2 choose a particular pair of options.
            Treat 0 as an even outcome: the higher the value, the more favorable
            it is for Player 1, and the lower the value, the more favorable it
            is for Player 2.
          </Text>
          <Text>
            You have a lot of freedom when setting payoffs, but here are a few
            examples:
          </Text>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              +1 when Player 1 wins, -1 when they lose, 0 when it's a draw (e.g.
              rock-paper-scissors)
            </List.Item>
            <List.Item>
              +x when Player 1 deals x damage, -x when they take x damage, 0
              when no damage is exchanged (e.g. fighting games)
            </List.Item>
            <List.Item>
              Extend the previous example by folding in the follow-up situation
              - okizeme pressure, frame advantage, screen position, meter gain,
              and so on
            </List.Item>
          </List.Root>
          <Text>
            The app assumes Player 1's gain is exactly Player 2's loss. If
            Player 1 earns x, Player 2 is treated as losing -x.
          </Text>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                Games where one player's benefit equals the other's loss are
                called two-player zero-sum games. Two-player competitive games
                focused purely on winning generally fit this model well.
                Non-zero-sum games such as the Prisoner's Dilemma are outside
                the scope of this app.
              </Text>
            </Alert.Description>
          </Alert.Root>
          <PayoffTableOverviewMock mode="values" />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Add row / column buttons
          </Heading>
          <Text>
            These buttons append a new row to the bottom or a new column to the
            right side of the table.
          </Text>
          <PayoffTableOverviewMock mode="add" />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Delete row / column buttons
          </Heading>
          <Text>Pressing these removes the selected row or column.</Text>
          <PayoffTableOverviewMock mode="delete" />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Swap rows and columns
          </Heading>
          <Text>
            Press this button to swap Player 1 and Player 2's perspectives.
          </Text>
          <PayoffTableOverviewMock mode="transpose" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HelpEnPayoffTableSection;
