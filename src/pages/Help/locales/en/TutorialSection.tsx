import { Alert, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import {
  TutorialCounterplayFlowPreview,
  TutorialCustomFlowPreview,
  TutorialPresetFlowPreview,
  TutorialStepCard,
} from "../shared";

const HelpEnTutorialSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        Tutorial
      </Heading>
      <Stack gap={4}>
        <Heading size="md" as="h3">
          A. Try a preset game (quick start)
        </Heading>
        <TutorialStepCard
          step="1"
          title="Choose a sample preset"
          description="Pick a sample game from the Sample Presets menu in the control panel."
          visual={<TutorialPresetFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="Press Calculate"
          description="Once the preset is loaded, press the Calculate button in the control panel."
          visual={<TutorialPresetFlowPreview activeStep={2} />}
        />
        <TutorialStepCard
          step="3"
          title="Check the recommended mix"
          description={
            <>
              <Text>
                After the calculation finishes, the app shows how often each
                option should be used.
              </Text>
              <Text>
                In this example, the result says Player 1 should choose Meaty
                Attack 67% of the time and Wait 33% of the time, while Player 2
                should choose Guard 87% of the time and Reversal 13% of the
                time.
              </Text>
            </>
          }
          visual={<TutorialPresetFlowPreview activeStep={3} />}
        />
      </Stack>
      <Stack gap={4}>
        <Separator my={2} />
        <Heading size="md" as="h3">
          B. Define your own game rules
        </Heading>
        <TutorialStepCard
          step="1"
          title="Name the rows and columns"
          description="Add or remove rows and columns as needed. Fill the red first column with Player 1 options and the blue first row with Player 2 options."
          visual={<TutorialCustomFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="Enter payoff values"
          description="Fill each payoff cell with Player 1's payoff value for that option combination."
          visual={<TutorialCustomFlowPreview activeStep={2} />}
        />
        <TutorialStepCard
          step="3"
          title="Press Calculate"
          description="Once the table is ready, press the Calculate button in the control panel."
          visual={<TutorialCustomFlowPreview activeStep={3} />}
        />
        <TutorialStepCard
          step="4"
          title="Check the recommended mix"
          description={
            <>
              <Text>
                After the calculation finishes, the results panel shows how
                often each option should be used.
              </Text>
              <Text>
                In this example, the result says Player 1 should choose Meaty
                Attack 67% of the time and Wait 33% of the time, while Player 2
                should choose Guard 87% of the time and Reversal 13% of the
                time.
              </Text>
            </>
          }
          visual={<TutorialCustomFlowPreview activeStep={4} />}
        />
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              You can decide the payoff values however you like: match result,
              damage dealt, positional advantage, or any custom measure. Larger
              numbers mean the situation favors Player 1, and smaller numbers
              mean Player 2 is better off. A value of 0 means the situation is
              even.
            </Text>
            <Text>
              For rock-paper-scissors, a simple setup is +1 when Player 1 wins,
              0 for a draw, and -1 when Player 2 wins. The presets provide handy
              references as well.
            </Text>
          </Alert.Description>
        </Alert.Root>
      </Stack>
      <Stack gap={4}>
        <Separator my={2} />
        <Heading size="md" as="h3">
          C. Analyze opponent habits and adapt to players
        </Heading>
        <TutorialStepCard
          step="1"
          title="Run the calculation and check Player 1's expected values"
          description={
            <>
              <Text>
                As in Tutorial A/B, first calculate the action selection ratios.
                A bar chart will also show the expected value of each Player 1
                option.
              </Text>
              <Text>
                In this example, Player 1's Meaty Attack and Wait both have the
                same expected value of +666.67.
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="Adjust Player 2's action ratio"
          description={
            <>
              <Text>
                Move the slider left and right to match the opponent's habits
                and adjust Player 2's action selection ratio.
              </Text>
              <Text>
                In this example, we increase Player 2's Reversal rate from the
                recommended 13% to 25%.
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={2} />}
        />
        <TutorialStepCard
          step="3"
          title="Check Player 1's expected values"
          description={
            <>
              <Text>
                Player 1's expected value for each option changes depending on
                Player 2's selection ratio.
              </Text>
              <Text>
                In this example, after Player 2 increases the Reversal rate,
                Player 1's expected value changes to 375 for Meaty Attack and
                1250 for Wait, which suggests increasing the frequency of Wait.
              </Text>
              <Text>
                In other words, when the opponent deviates from the recommended
                ratio, you can often exploit that bias and choose actions with a
                higher expected value.
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={3} />}
        />
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              This is how player-specific adaptation works: by identifying an
              opponent's habits and increasing the options that beat them, you
              can raise your expected value. But if you lean too hard in that
              direction, your own strategy becomes biased, and the opponent can
              start exploiting you in return. That is how the mind game keeps
              rotating.
            </Text>
          </Alert.Description>
        </Alert.Root>
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              A good way to think about the recommended action ratios from this
              calculator is as a defensive baseline that prevents the opponent
              from exploiting you. In real matches, strong decision making comes
              from balancing offense that punishes habits with defense that
              avoids becoming predictable.
            </Text>
          </Alert.Description>
        </Alert.Root>
      </Stack>
    </Stack>
  );
};

export default HelpEnTutorialSection;
