import { Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import { ControlPanelOverviewMock } from "../shared";

const HelpEnControlPanelSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        Control panel
      </Heading>
      <Text>
        The control panel below the payoff table lets you run calculations and
        access the main utilities.
      </Text>
      <ControlPanelOverviewMock />
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
        <List.Item>Reset: clears the form back to its initial state.</List.Item>
      </List.Root>
    </Stack>
  );
};

export default HelpEnControlPanelSection;
