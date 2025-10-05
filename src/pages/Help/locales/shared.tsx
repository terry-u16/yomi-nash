import { Box, Stack } from "@chakra-ui/react";
import type React from "react";

interface HelpContentLayoutProps {
  children: React.ReactNode;
}

export const HelpContentLayout: React.FC<HelpContentLayoutProps> = ({ children }) => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>{children}</Stack>
    </Box>
  );
};
