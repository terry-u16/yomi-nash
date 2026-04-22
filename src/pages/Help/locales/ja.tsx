import {
  Alert,
  Heading,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import {
  ControlPanelOverviewMock,
  HelpContentLayout,
  PayoffTableOverviewMock,
  TutorialCounterplayFlowPreview,
  TutorialCustomFlowPreview,
  TutorialPresetFlowPreview,
  TutorialStepCard,
} from "./shared";
import type React from "react";

const HelpJa: React.FC = () => {
  return (
    <HelpContentLayout>
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
      <Separator my={4} size="lg" />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          チュートリアル
        </Heading>
        <Stack gap={4}>
          <Heading size="md" as="h3">
            A. プリセットからゲームのルールを選ぶ（おためし）
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
                  計算が終わると、各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
                </Text>
                <Text>
                  今回の例では、Player 1は打撃重ねを67% / 様子見を33%、Player
                  2はガードを87% /
                  無敵技を13%の割合で選ぶのが良いと計算されました。
                </Text>
              </>
            }
            visual={<TutorialPresetFlowPreview activeStep={3} />}
          />
        </Stack>
        <Stack gap={4}>
          <Separator my={2} />
          <Heading size="md" as="h3">
            B. 自分でゲームのルールを設定する
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
                  計算が終わると、各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
                </Text>
                <Text>
                  今回の例では、Player 1は打撃重ねを67% / 様子見を33%、Player
                  2はガードを87% /
                  無敵技を13%の割合で選ぶのが良いと計算されました。
                </Text>
              </>
            }
            visual={<TutorialCustomFlowPreview activeStep={4} />}
          />
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                利得（うれしさ）は、勝敗・ダメージ値・状況の良さなど自由に決めて構いません。値が大きいほど
                Player 1 が有利であることを、値が小さいほど Player 2
                が有利であること、0であれば互角であることをを表します。
              </Text>
              <Text>
                じゃんけんを例に取ると、 Player 1 が勝つなら +1 、あいこなら 0
                、Player 2 が勝つなら -1
                などとするとよいです。サンプルプリセットも参考にしてください。
              </Text>
            </Alert.Description>
          </Alert.Root>
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
            </Alert.Description>
          </Alert.Root>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                この計算機で計算されるおすすめの行動選択割合は、相手につけ込まれることを防ぐ守りの戦略と考えると良いでしょう。相手の癖につけ込む攻めと、相手につけ込まれないための守りを上手く調整しながら使い分けることが、対戦ゲームの読み合いにおいて重要となります。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
      </Stack>
      <Separator my={4} size="lg" />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          戦略相性表
        </Heading>
        <Text>
          Player 1 の各選択肢と Player 2 の各選択肢の相性を記入する表です。
        </Text>
        <Stack gap={10}>
          <Stack>
            <Heading size="md" as="h3">
              選択肢名
            </Heading>
            <Text>
              取りうる選択肢の名前です。Player 1 の選択肢は赤、Player 2
              の選択肢は青で表示されます。好きな名前を付けてください。
            </Text>
            <PayoffTableOverviewMock mode="names" />
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              利得（うれしさ）
            </Heading>
            <Text>
              Player 1, Player 2 がそれぞれある選択肢を採ったときに、Player 1
              がどのくらい嬉しいかを表す値を入力します。0
              を互角の状態として、プラスの値になればなるほど Player 1
              が有利・マイナスの値になればなるほど Player 2
              が有利であることを表します。
            </Text>
            <Text>
              利得の設定方法は比較的自由ですが、いくつか設定例を挙げます。
            </Text>
            <List.Root ps={4} as="ol" listStyle="decimal">
              <List.Item>
                Player 1 が勝ったら +1 、負けたら -1 、引き分けなら 0
                （じゃんけんなど）
              </List.Item>
              <List.Item>
                Player 1 が x ダメージを与えたら +x 、 x ダメージを受けたら -x
                、ダメージのやり取りがなければ 0 （格闘ゲームなど）
              </List.Item>
              <List.Item>
                2.
                に加えて、その後の状況の良さ（起き攻め・有利フレーム・画面位置・ゲージ状況など）を加味した値にする
              </List.Item>
            </List.Root>
            <Text>
              なおこのアプリでは、「Player 1 が得をした分 Player 2
              が損をする」という設定のゲームを扱います。 Player 1 の利得が x
              の場合、 Player 2 の利得は -x として解釈されます。
            </Text>
            <Alert.Root status="info" mt={2}>
              <Alert.Indicator />
              <Alert.Description>
                <Text>
                  「Player 1 が得をした分 Player 2
                  が損をする」という設定のゲームを、2人ゼロサムゲームと呼びます。純粋に勝利のみを目的とする対戦ゲームは2人ゼロサムゲームに含まれると考えて良いでしょう。
                  一方、囚人のジレンマのような非ゼロサムゲームはこのアプリでは扱えません。
                </Text>
              </Alert.Description>
            </Alert.Root>
            <PayoffTableOverviewMock mode="values" />
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列追加ボタン
            </Heading>
            <Text>
              ボタンを押すと、表の下または右に新しい行・列が追加されます。
            </Text>
            <PayoffTableOverviewMock mode="add" />
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列削除ボタン
            </Heading>
            <Text>ボタンを押すと、該当する行・列が削除されます。</Text>
            <PayoffTableOverviewMock mode="delete" />
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列入れ替えボタン
            </Heading>
            <Text>
              ボタンを押すと、Player 1 と Player 2 の視点を入れ替えます。
            </Text>
            <PayoffTableOverviewMock mode="transpose" />
          </Stack>
        </Stack>
      </Stack>
      <Separator my={4} size="lg" />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          操作パネル
        </Heading>
        <Text>
          戦略相性表の下にある操作パネルから、計算や共有などの主要な操作を行えます。
        </Text>
        <ControlPanelOverviewMock />
        <List.Root ps={4} as="ul" listStyle="disc">
          <List.Item>
            計算: 今の表をもとに、おすすめの比率を計算します。
          </List.Item>
          <List.Item>
            シェア: 現在の入力をX（旧Twitter）で共有します。
          </List.Item>
          <List.Item>
            サンプルプリセット: よくある対戦状況の例を読み込みます。
          </List.Item>
          <List.Item>
            CSVアップロード: 戦略相性表が記入されたCSVファイルを読み込みます。
          </List.Item>
          <List.Item>
            CSVダウンロード: 今の表をCSVファイルとして保存します。
          </List.Item>
          <List.Item>リセット: 入力内容を初期状態に戻します。</List.Item>
        </List.Root>
      </Stack>
      <Separator my={4} size="lg" />
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
      <Separator />
      <Text>
        お気付きの点やご要望があれば{" "}
        <Link
          href="https://github.com/terry-u16/yomi-nash"
          colorPalette="blue"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <TbExternalLink />
        </Link>{" "}
        の Issues でお知らせください。
      </Text>
    </HelpContentLayout>
  );
};

export default HelpJa;
