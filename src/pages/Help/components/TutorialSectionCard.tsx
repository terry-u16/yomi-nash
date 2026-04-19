import { Box, Heading, Stack } from "@chakra-ui/react";
import type React from "react";

interface TutorialSectionCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export const TutorialSectionCard: React.FC<TutorialSectionCardProps> = ({
  title,
  children,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      bg="bg.muted"
      p={4}
      boxShadow="xs"
    >
      <Stack gap={4}>
        <Heading size="md" as="h3">
          {title}
        </Heading>
        <Stack gap={4}>{children}</Stack>
      </Stack>
    </Box>
  );
};
