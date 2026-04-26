import { Alert, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import {
  TutorialCounterplayFlowPreview,
  TutorialCustomFlowPreview,
  TutorialPresetFlowPreview,
  TutorialStepCard,
} from "../shared";
import { HELP_TUTORIAL_SECTION_ID } from "@/constants/help";

const HelpJaTutorialSection: React.FC = () => {
  return (
    <Stack gap={4}>
      <Heading
        id={HELP_TUTORIAL_SECTION_ID}
        scrollMarginTop="6rem"
        size="xl"
        as="h2"
      >
        チュートリアル
      </Heading>
      <Stack gap={4}>
        <Heading size="md" as="h3">
          A.
          プリセットからゲームのルールを選び、どの選択肢をどの割合で選ぶのが良いか計算する（おためし用）
        </Heading>
        <TutorialStepCard
          step="1"
          title="サンプルプリセットを選ぶ"
          description="操作パネルのサンプルプリセットから、お好みのサンプルゲームを選んでください。"
          visual={<TutorialPresetFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="計算ボタンを押す"
          description="プリセットを読み込んだら、操作パネルの計算ボタンをクリックしてください。"
          visual={<TutorialPresetFlowPreview activeStep={2} />}
        />
        <TutorialStepCard
          step="3"
          title="おすすめの比率を確認する"
          description={
            <>
              <Text>
                計算が終わると、各選択肢をどのくらいの割合で選ぶと良いかが表示されます。
              </Text>
              <Text>
                今回の例では、Player 1は打撃重ねを67% / 様子見を33%、Player
                2はガードを87% /
                無敵技を13%の割合で選ぶのが良いと計算されました。
              </Text>
              <Text>
                また、このときの Player 1 の期待値はプラスの値であり、 Player 1
                が有利であることが分かります。つまり、 Player 1
                は積極的にこの状況を狙っていくべきであると言えます。
              </Text>
            </>
          }
          visual={<TutorialPresetFlowPreview activeStep={3} />}
        />
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              ここで計算される選択割合は、必ずしもベストな戦略を表すわけではありません。極端な例を挙げると、もし仮に
              Player 2 が100%無敵技を出してくると分かっているのであれば、 Player
              1 は毎回様子見して毎回カウンターを叩き込むのがベストだからです。
            </Text>
            <Text>
              一方、 Player 2
              がガード87%、無敵技13%の割合で選ぶとすると、それが分かっていたとしても
              Player 1 は相手の癖につけ込むことができなくなります。
            </Text>
            <Text>
              このように、「相手に自分の癖が読まれた場合でも、弱みにつけ込まれることがない比較的安全な守りの戦略」と考えると良いでしょう。
            </Text>
          </Alert.Description>
        </Alert.Root>
      </Stack>
      <Stack gap={4}>
        <Separator my={2} />
        <Heading size="md" as="h3">
          B.
          自分でゲームのルールを設定し、どの選択肢をどの割合で選ぶのが良いか計算する
        </Heading>
        <TutorialStepCard
          step="1"
          title="行と列の名前を入力する"
          description="戦略相性表の行・列を必要に応じて追加・削除し、1列目の赤いセルに Player 1 の選択肢を、1行目の青いセルに Player 2 の選択肢を記入してください。"
          visual={<TutorialCustomFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="各組み合わせの利得を入力する"
          description="戦略相性表の各セルに、各選択肢の組み合わせに対する Player 1 の利得（うれしさ）を数値で記入してください。"
          visual={<TutorialCustomFlowPreview activeStep={2} />}
        />
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              利得は、勝敗・ダメージ値・状況の良さなど自由に決めて構いません。値が大きいほど
              Player 1 が有利であることを、値が小さいほど Player 2
              が有利であることを、0であれば互角であることを表します。
            </Text>
            <Text>
              じゃんけんを例に取ると、 Player 1 が勝つなら +1 、あいこなら 0
              、Player 2 が勝つなら -1
              などとするとよいです。サンプルプリセットも参考にしてください。
            </Text>
          </Alert.Description>
        </Alert.Root>
        <TutorialStepCard
          step="3"
          title="計算ボタンを押す"
          description="入力が終わったら、操作パネルの計算ボタンをクリックしてください。"
          visual={<TutorialCustomFlowPreview activeStep={3} />}
        />
        <TutorialStepCard
          step="4"
          title="おすすめの比率を確認する"
          description={
            <>
              <Text>
                計算が終わると、各選択肢をどのくらいの割合で選ぶと良いかが表示されます。
              </Text>
              <Text>
                今回の例では、Player 1は打撃重ねを67% / 様子見を33%、Player
                2はガードを87% /
                無敵技を13%の割合で選ぶのが良いと計算されました。
              </Text>
              <Text>
                また、このときの Player 1 の期待値はプラスの値であり、 Player 1
                が有利であることが分かります。つまり、 Player 1
                は積極的にこの状況を狙っていくべきであると言えます。
              </Text>
            </>
          }
          visual={<TutorialCustomFlowPreview activeStep={4} />}
        />
      </Stack>
      <Stack gap={4}>
        <Separator my={2} />
        <Heading size="md" as="h3">
          C. 対戦相手の癖を分析して人対策をする
        </Heading>
        <TutorialStepCard
          step="1"
          title="計算を行い、Player 1の行動期待値を確認する"
          description={
            <>
              <Text>
                チュートリアルA/Bと同様に、行動選択割合の計算を行ってください。Player
                1の選択肢ごとの期待値が棒グラフで表示されます。
              </Text>
              <Text>
                今回の場合、Player
                1は打撃重ねをしても様子見をしても期待値は同じ+666.67になると計算されました。
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={1} />}
        />
        <TutorialStepCard
          step="2"
          title="Player 2の行動選択割合を変更する"
          description={
            <>
              <Text>
                スライダーを左右に操作し、対戦相手の癖に合わせてPlayer
                2の行動選択割合を変更します。
              </Text>
              <Text>
                今回の例では、Player
                2が無敵技を選択する確率をおすすめの13%から25%に上げてみました。
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={2} />}
        />
        <TutorialStepCard
          step="3"
          title="Player 1の行動ごとの期待値を確認する"
          description={
            <>
              <Text>
                Player 1の選択肢ごとの期待値は、Player
                2の選択割合に応じて変化します。
              </Text>
              <Text>
                今回の例では、Player 2が無敵技の割合を増やしたことで、Player
                1の打撃重ねの期待値が375、様子見の期待値が1250に変化したため、様子見を増やすのが良さそうだと分かります。
              </Text>
              <Text>
                このように、相手がおすすめの選択割合から外れているときは、その偏りにつけ込むことでより期待値の高い行動を取ることができます。
              </Text>
            </>
          }
          visual={<TutorialCounterplayFlowPreview activeStep={3} />}
        />
        <Alert.Root status="info" mt={2}>
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              このように相手の癖を分析し、それに対して有利な選択を増やすことで期待値を高めることができますが、そうすると自分の戦略も偏ることになるため、相手はそれに対する有利な選択を増やしてくるでしょう。このようにして読み合いが回っていきます。
            </Text>
            <Text>
              繰り返しになりますが、この計算機で計算されるおすすめの行動選択割合は、相手につけ込まれることを防ぐ守りの戦略と考えると良いでしょう。相手の癖につけ込む攻めと、相手につけ込まれないための守りを上手く調整しながら使い分けることが、対戦ゲームの読み合いにおいて重要となります。
            </Text>
          </Alert.Description>
        </Alert.Root>
      </Stack>
    </Stack>
  );
};

export default HelpJaTutorialSection;
