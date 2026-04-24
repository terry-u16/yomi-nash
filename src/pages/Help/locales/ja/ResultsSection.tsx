import { Heading, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import {
  ExpectedValueOverviewMock,
  ResultTableOverviewMock,
  StrategyAdjustmentOverviewMock,
} from "../shared";

const HelpJaResultsSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading size="xl" as="h2">
        計算結果の見方
      </Heading>
      <Stack gap={10}>
        <Text>
          計算が終わると「計算結果」カードが表示され、どの選択肢をどのくらいの割合で選ぶと良いか、またそのときの期待される結果を確認できます。
        </Text>
        <Stack>
          <Heading size="md" as="h3">
            Player 1 期待値
          </Heading>
          <Text>
            Player 1 が平均してどれくらい得をしそうかを表します。プラスなら
            Player 1 有利、マイナスなら Player 1 不利（Player 2 有利）です。
          </Text>
          <ExpectedValueOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            戦略分析
          </Heading>
          <Text>
            各プレイヤーがどの選択肢をどのくらいの割合で選ぶか、各選択肢を選んだときの期待値がどの程度かが表示されます。
          </Text>
          <Text>
            スライダーを左右にドラッグすることで、各選択肢の選択割合を変更できます。選択割合を変えたときに結果がどう変化するか確認したいときに便利です。
          </Text>
          <Text>
            「期待値」グラフには、各選択肢を選んだときの期待値が表示されます。棒が上に伸びるほどそのプレイヤーにとって有利な展開、下に伸びるほど不利な展開を表します。
          </Text>
          <StrategyAdjustmentOverviewMock />
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            詳細結果表
          </Heading>
          <Text>
            「詳細結果表」では、各選択肢のペアが選ばれる確率と、そのときの結果を確認できます。
          </Text>
          <Text>
            棒グラフの色は、赤くなるほど Player 1
            にとって有利な展開であることを、青くなるほど Player 2
            にとって有利な展開であることを表します。棒の長さは、選択肢のペアが選ばれる確率を表します。
          </Text>
          <ResultTableOverviewMock />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HelpJaResultsSection;
