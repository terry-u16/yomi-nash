import PayoffTable from "@/components/PayoffTable";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <Stack gap={6}>
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          利得行列
        </Heading>
        <PayoffTable />
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
