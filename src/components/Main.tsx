import { Box, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { GameInputUI, GameResult } from "@/types/game";
import { presets } from "@/presets";

interface Props {
  maxWidth: string | undefined;
}

const Main: React.FC<Props> = ({ maxWidth }: Props) => {
  const [inputUI, setInputUI] = useState<GameInputUI>(presets.okizeme.data);
  const [result, setResult] = useState<GameResult | null>(null);

  return (
    <Flex justify="center" px={4} my={4}>
      <Box w="100%" maxW={maxWidth} p={{ base: 2, md: 4 }}>
        <Outlet context={{ inputUI, setInputUI, result, setResult }} />
      </Box>
    </Flex>
  );
};

export default Main;
