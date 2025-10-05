import {
  Alert,
  Heading,
  Highlight,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { HelpContentLayout } from "./shared";
import type React from "react";

const HelpEn: React.FC = () => {
  return (
    <HelpContentLayout>
      <Stack gap={2}>
        <Heading size="xl" as="h2">
          What is this app?
        </Heading>
        <Text>
          <Highlight
            query="what probability mix keeps your options balanced"
            styles={{ px: "0.5", bg: "red.muted" }}
          >
            This app calculates what probability mix keeps your options balanced
            in two-player competitive games, from fighting games to
            rock-paper-scissors.
          </Highlight>
        </Text>
        <Text>
          Take rock-paper-scissors for example: if you throw rock too often,
          your opponent will notice and punish you with paper. To avoid getting
          read, a solid plan is to pick rock, scissors, and paper randomly with
          equal probability. If both players think the same way, they each end
          up using every hand one third of the time. This app computes that kind
          of stable strategy for you.
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
              equilibrium of two-player zero-sum games — the state where, even
              if both players know each other's plan, neither can unilaterally
              switch strategies to do better.
            </Text>
          </Alert.Description>
        </Alert.Root>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          Tutorial
        </Heading>
        <Stack>
          <Heading size="md" as="h3">
            A. Try a preset game (quick start)
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              Pick a sample game from “Sample Presets” in the control panel.
            </List.Item>
            <List.Item>
              Press the “Calculate” button in the control panel.
            </List.Item>
            <List.Item>
              The recommended mix for each option will appear instantly.
            </List.Item>
          </List.Root>
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            B. Define your own game rules
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              Add or remove rows and columns in the payoff table as needed. Fill
              the first column (red cells) with Player 1 options and the first
              row (blue cells) with Player 2 options.
            </List.Item>
            <List.Item>
              Enter Player 1's payoff (how happy Player 1 is) for each option
              combination in the remaining cells.
            </List.Item>
            <List.Item>
              Press the “Calculate” button in the control panel.
            </List.Item>
            <List.Item>
              The app will show the probability mix that keeps each option
              balanced.
            </List.Item>
          </List.Root>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                You can decide the payoff values however you like: match result,
                damage dealt, positional advantage, or any custom measure.
                Larger numbers mean the situation favors Player 1, and smaller
                numbers mean Player 2 is better off.
              </Text>
              <Text>
                For rock-paper-scissors, a simple setup is +1 when Player 1
                wins, 0 for a draw, and -1 when Player 2 wins. The presets
                provide handy references as well.
              </Text>
            </Alert.Description>
          </Alert.Root>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                Setting payoffs so that evenly matched outcomes are 0 makes the
                results easier to interpret.
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          Payoff table
        </Heading>
        <Text>
          This table records how each Player 1 option interacts with each Player
          2 option.
        </Text>
        <Stack gap={4}>
          <Stack>
            <Heading size="md" as="h3">
              Option names
            </Heading>
            <Text>
              These are the cells in the first row and first column. Player 1
              options appear in red, Player 2 options in blue. Name them however
              you like.
            </Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              Payoff values
            </Heading>
            <Text>
              Fill the rest of the table with numbers that describe how happy
              Player 1 is when each pair of options resolves. Treat 0 as an even
              outcome: the higher the value, the better it is for Player 1; the
              lower the value, the better it is for Player 2.
            </Text>
            <Text>
              You have a lot of freedom when setting payoffs, but here are a few
              examples:
            </Text>
            <List.Root ps={4} as="ol" listStyle="decimal">
              <List.Item>
                +1 when Player 1 wins, -1 when they lose, 0 when it's a draw
                (e.g. rock-paper-scissors)
              </List.Item>
              <List.Item>
                +x when Player 1 deals x damage, -x when they take x damage, 0
                when no damage is exchanged (e.g. fighting games)
              </List.Item>
              <List.Item>
                Extend the previous example by folding in the follow-up
                situation — okizeme pressure, frame advantage, screen position,
                meter gain, and so on
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
                  called two-player zero-sum games. Competitive games focused
                  purely on winning fit this model well. Non-zero-sum games like
                  the Prisoner's Dilemma are outside the scope of the app.
                </Text>
              </Alert.Description>
            </Alert.Root>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              Add row / column buttons
            </Heading>
            <Text>
              These buttons append a new row to the bottom or a new column to
              the right side of the table.
            </Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              Delete row / column buttons
            </Heading>
            <Text>Pressing these removes the selected row or column.</Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              Swap rows and columns
            </Heading>
            <Text>
              The switch button in the lower right corner swaps Player 1 and
              Player 2's perspectives.
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          Control panel
        </Heading>
        <Text>
          The control panel below the payoff table lets you run calculations and
          access the main utilities.
        </Text>
        <List.Root ps={4} as="ul" listStyle="disc">
          <List.Item>
            Calculate: solves for the recommended mix using the current table.
          </List.Item>
          <List.Item>
            Share: posts the current inputs to X (formerly Twitter).
          </List.Item>
          <List.Item>Sample Presets: loads common matchup examples.</List.Item>
          <List.Item>
            CSV Upload: imports a CSV file that already contains payoff values.
          </List.Item>
          <List.Item>
            CSV Download: saves the current table as a CSV file.
          </List.Item>
          <List.Item>Transpose Matrix: swaps rows and columns.</List.Item>
          <List.Item>
            Reset: clears the form back to its initial state.
          </List.Item>
        </List.Root>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          Reading the results
        </Heading>
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
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            Detailed results table
          </Heading>
          <Text>
            The “Detailed Results” table augments the original grid with row and
            column averages and a color-coded overall average.
          </Text>
        </Stack>
      </Stack>
      <Separator />
      <Text>
        Found an issue or have feedback? Let us know via{" "}
        <Link
          href="https://github.com/terry-u16/yomi-nash"
          colorPalette="blue"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <TbExternalLink />
        </Link>{" "}
        Issues.
      </Text>
    </HelpContentLayout>
  );
};

export default HelpEn;
