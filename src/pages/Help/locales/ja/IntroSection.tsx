import { Alert, Heading, Stack, Text } from "@chakra-ui/react";
import type React from "react";

const HelpJaIntroSection: React.FC = () => {
  return (
    <Stack gap={2}>
      <Heading size="xl" as="h2">
        このアプリは何？
      </Heading>
      <Text>
        格ゲーやじゃんけんをはじめとした2人対戦ゲームにおいて、どの選択肢をどのくらいの確率で選ぶといい感じになるかを計算するアプリです。
      </Text>
      <Text>
        例えばじゃんけんの場合、グーを多く出す人は相手にそれを読まれてパーを多く出されて負けてしまいます。
        そのように自分の癖を相手につけ込まれることを防ぐためには、グー・チョキ・パーをそれぞれ等確率で1/3ずつランダムに出す戦略が合理的です。
        相手も同じことを考えると、お互いがグー・チョキ・パーをそれぞれ等確率で1/3ずつ出すことになります。
        このアプリは、このようないい感じの戦略を計算します。
      </Text>
      <Text>
        「格ゲーの読み合いにおいてどの選択肢をどのくらいの割合で混ぜるのが良いか？」などを計算するためにお使いください。
      </Text>
      <Alert.Root status="info" mt={2}>
        <Alert.Indicator />
        <Alert.Description>
          <Text>
            厳密には、2人ゼロサムゲームにおける混合戦略ナッシュ均衡を計算します。
            これは「お互いが相手の戦略を分かっていたとしても、それぞれ今の戦略より良い戦略が存在しない」という状態を指します。
          </Text>
        </Alert.Description>
      </Alert.Root>
    </Stack>
  );
};

export default HelpJaIntroSection;
