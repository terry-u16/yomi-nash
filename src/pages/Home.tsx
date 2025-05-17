import PayoffTable from "@/components/PayoffTable";
import type { GameInputUI } from "@/types/game";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const Home: React.FC = () => {
  const { inputUI, setInputUI } = useOutletContext<LayoutContext>();

  return (
    <Stack gap={6}>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          利得行列
        </Heading>
        <PayoffTable inputUI={inputUI} setInputUI={setInputUI} />
      </Box>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          簡易説明
        </Heading>
        <Text>簡易説明（いい感じの択の混ぜ方を計算してくれます、など）</Text>
      </Box>
    </Stack>
  );
};

export default Home;
