import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type React from "react";

interface TutorialStepCardProps {
  step: string;
  title: string;
  description: React.ReactNode;
  visual?: React.ReactNode;
}

export const TutorialStepCard: React.FC<TutorialStepCardProps> = ({
  step,
  title,
  description,
  visual,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="lg"
      bg="bg"
      p={4}
      boxShadow="xs"
    >
      <Stack gap={4} direction={{ base: "column", lg: "row" }} align="stretch">
        <Stack gap={3} flex="1" minW="0">
          <HStack gap={3} align="center">
            <Box
              minW="2rem"
              h="2rem"
              borderRadius="sm"
              bg="blue.solid"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {step}
            </Box>
            <Heading size="md" as="h4">
              {title}
            </Heading>
          </HStack>
          <Text color="fg.muted">{description}</Text>
        </Stack>
        {visual ? (
          <Box flex="1" minW={{ base: "auto", lg: "360px" }}>
            {visual}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
