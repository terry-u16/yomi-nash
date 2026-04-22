import { Heading, Stack, Text } from "@chakra-ui/react";
import type React from "react";

const HelpJaResultsSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        計算結果の見方
      </Heading>
      <Text>
        計算が終わると「計算結果」カードが表示され、どの選択肢をどのくらい混ぜると良いか、またそのときの期待できる結果を確認できます。
      </Text>
      <Stack>
        <Heading size="md" as="h3">
          Player 1 期待値
        </Heading>
        <Text>
          この数字は Player 1
          が平均してどれくらい得をしそうかを表します。プラスなら Player 1
          有利、マイナスなら Player 2 有利です。
        </Text>
      </Stack>
      <Stack>
        <Heading size="md" as="h3">
          戦略の調整
        </Heading>
        <Text>
          各プレイヤーの「選択割合」グラフでは、スライダーをドラッグして割合を動かせます。比率を変えたときに結果がどう変化するか確認したいときに便利です。
        </Text>
        <Text>
          下の「期待値」棒グラフは、各選択肢を選んだ場合に平均してどれくらい得をしそうかを表します。棒が上に伸びるほどそのプレイヤーにとって良い展開です。
        </Text>
      </Stack>
      <Stack>
        <Heading size="md" as="h3">
          詳細結果表
        </Heading>
        <Text>
          「詳細結果表」では、もとの表に加えて行や列ごとの平均値、全体の平均値が色付きで表示されます。
        </Text>
      </Stack>
    </Stack>
  );
};

export default HelpJaResultsSection;
