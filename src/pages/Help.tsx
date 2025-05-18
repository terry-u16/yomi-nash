import { Box, Heading, List, Stack, Text } from "@chakra-ui/react";

const Help: React.FC = () => {
  return (
    <Box my={4} p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={4}>
        <Stack gap={2}>
          <Heading size="xl" mb={2} as="h2">
            チュートリアル
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              操作パネルのサンプルプリセットから、お好みのサンプル問題を選んでください。
            </List.Item>
            <List.Item>
              操作パネルの計算ボタンをクリックしてください。
            </List.Item>
            <List.Item>
              各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
            </List.Item>
          </List.Root>
        </Stack>
        <Stack gap={2}>
          <Heading size="xl" mb={2} as="h2">
            使い方
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              操作パネルのサンプルプリセットから、お好みのサンプル問題を選んでください。
            </List.Item>
            <List.Item>
              操作パネルの計算ボタンをクリックしてください。
            </List.Item>
            <List.Item>
              各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
            </List.Item>
          </List.Root>
        </Stack>

      </Stack>
    </Box>);
};

export default Help;
