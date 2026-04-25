import { Alert, Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";

const HelpJaIntroSection: React.FC = () => {
  return (
    <Stack gap={2}>
      <Heading size="xl" as="h2">
        このアプリは何？
      </Heading>
      <Text>
        格闘ゲームをはじめとした2人対戦ゲームの読み合いにおいて、ゲーム理論を用いてどの選択肢をどのくらいの確率で選ぶのがおすすめかを計算するアプリです。
      </Text>
      <Text>
        例えばじゃんけんの場合、グーを多く出す人は相手にそれを読まれてパーを多く出されて負けてしまいます。
        そのように自分の癖を相手につけ込まれることを防ぐためには、グー・チョキ・パーをそれぞれ等確率で1/3ずつランダムに出す戦略が合理的です。
        相手も同じことを考えると、お互いがグー・チョキ・パーをそれぞれ等確率で1/3ずつ出すことになります。
        このアプリは、このような自分の癖を相手につけ込まれることのない戦略を計算します。
      </Text>
      <Text>以下のような用途にお使いください。</Text>
      <List.Root ps={4}>
        <List.Item>
          格闘ゲームの立ち回りやセットプレイにおいて、どの選択肢をどのくらいの割合で選択するのが良いか分析する
        </List.Item>
        <List.Item>
          対戦相手の取る選択肢の癖を入力し、こちらはどの選択肢を取るのが期待値的に最も有効か分析する
        </List.Item>
        <List.Item>
          ある状況における期待値を計算し、積極的にその状況を狙うべきか、可能な限り避ける（読み合いに付き合わない）べきか分析する
        </List.Item>
      </List.Root>
      <Alert.Root status="info" mt={2}>
        <Alert.Indicator />
        <Alert.Description>
          <Text>
            専門用語で言えば、このアプリは2人ゼロサムゲームにおける混合戦略ナッシュ均衡を計算します。
          </Text>
          <Text>
            これは「お互いが相手の戦略を分かっていたとしても、それぞれ今の戦略より良い戦略が存在しない」という状態を指します。
          </Text>
        </Alert.Description>
      </Alert.Root>
    </Stack>
  );
};

export default HelpJaIntroSection;
