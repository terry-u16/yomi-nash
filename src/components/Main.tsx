import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { GameInputUISchema } from "@/lib/parser/parseGameInputUI";
import { GameResultSchema } from "@/lib/parser/parseGameResult";
import type { GameInputUI, GameResult } from "@/types/game";
import { createDefaultGameInputUI } from "@/presets";
import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import type { ShareEnvelope } from "@/utils/shareCodec";

interface Props {
  maxWidth: string | undefined;
}

const Main: React.FC<Props> = ({ maxWidth }: Props) => {
  const [inputUI, setInputUI] = useState<GameInputUI>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.inputUI);
      if (raw) {
        const parsed = JSON.parse(raw) as ShareEnvelope<unknown>;
        if (parsed.version === DATA_SCHEMA_VERSION) {
          const validated = GameInputUISchema.safeParse(parsed.payload);
          if (validated.success) {
            return validated.data;
          }
        }
      }
    } catch {
      // ignore
    }
    return createDefaultGameInputUI();
  });
  const [result, setResult] = useState<GameResult | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.result);
      if (raw) {
        const parsed = JSON.parse(raw) as ShareEnvelope<unknown>;
        if (parsed.version === DATA_SCHEMA_VERSION) {
          const validated = GameResultSchema.safeParse(parsed.payload);
          if (validated.success) {
            return validated.data as GameResult;
          }
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  return (
    <Flex justify="center" px={4} my={4}>
      <Box w="100%" maxW={maxWidth} p={{ base: 2, md: 4 }}>
        <Outlet context={{ inputUI, setInputUI, result, setResult }} />
      </Box>
    </Flex>
  );
};

export default Main;
