import { Box, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { GameInputUI, GameResult } from "@/types/game";
import { presets } from "@/presets";

const Layout: React.FC = () => {
  const maxWidth = useBreakpointValue({
    base: "100%",
    sm: "90%",
    md: "768px",
    lg: "960px",
  });

  const [inputUI, setInputUI] = useState<GameInputUI>(presets.okizeme.data);
  const [result, setResult] = useState<GameResult | null>(null);

  return (
    <Stack bg="bg.muted" minH="100vh" gap={4}>
      <Header />
      <Flex justify="center" px={4}>
        <Box w="100%" maxW={maxWidth} p={{ base: 2, md: 4 }}>
          <Outlet context={{ inputUI, setInputUI, result, setResult }} />
        </Box>
      </Flex>
    </Stack>
  );
};

export default Layout;
