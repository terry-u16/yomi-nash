import {
  Alert,
  Heading,
  Highlight,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { HelpContentLayout } from "./shared";
import type React from "react";

const HelpJa: React.FC = () => {
  return (
    <HelpContentLayout>
      <Stack gap={2}>
        <Heading size="xl" as="h2">
          このアプリは何？
        </Heading>
        <Text>
          <Highlight
            query="どの選択肢をどのくらいの確率で選ぶといい感じになるか"
            styles={{ px: "0.5", bg: "red.muted" }}
          >
            格ゲーやじゃんけんをはじめとした2人対戦ゲームにおいて、どの選択肢をどのくらいの確率で選ぶといい感じになるかを計算するアプリです。
          </Highlight>
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
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          チュートリアル
        </Heading>
        <Stack>
          <Heading size="md" as="h3">
            A. プリセットからゲームのルールを選ぶ（おためし）
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              操作パネルのサンプルプリセットから、お好みのサンプルゲームを選んでください。
            </List.Item>
            <List.Item>
              操作パネルの計算ボタンをクリックしてください。
            </List.Item>
            <List.Item>
              各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
            </List.Item>
          </List.Root>
        </Stack>
        <Stack>
          <Heading size="md" as="h3">
            B. 自分でゲームのルールを設定する
          </Heading>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              戦略相性表の行・列を必要に応じて追加・削除し、1列目（赤いセル）に
              Player 1 の選択肢を、1行目（青いセル）に Player 2
              の選択肢を記入してください。
            </List.Item>
            <List.Item>
              戦略相性表の各セルに、各選択肢の組み合わせに対する Player 1
              の利得（うれしさ）を数値で記入してください。
            </List.Item>
            <List.Item>
              操作パネルの計算ボタンをクリックしてください。
            </List.Item>
            <List.Item>
              各選択肢をどのくらいの割合で選ぶといい感じになるかが表示されます。
            </List.Item>
          </List.Root>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                利得（うれしさ）は、勝敗・ダメージ値・状況の良さなど自由に決めて構いません。値が大きいほど
                Player 1 が有利であることを、値が小さいほど Player 2
                が有利であることを表します。
              </Text>
              <Text>
                じゃんけんを例に取ると、 Player 1 が勝つなら +1 、あいこなら 0
                、Player 2 が勝つなら -1
                などとするとよいです。サンプルプリセットも参考にしてください。
              </Text>
            </Alert.Description>
          </Alert.Root>
          <Alert.Root status="info" mt={2}>
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                互角の時に利得が 0
                となるように設定すると、計算結果が分かりやすくなります。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          戦略相性表
        </Heading>
        <Text>
          Player 1 の各選択肢と Player 2 の各選択肢の相性を記入する表です。
        </Text>
        <Stack gap={4}>
          <Stack>
            <Heading size="md" as="h3">
              選択肢名
            </Heading>
            <Text>
              表の1行目・1列目のセルです。Player 1 の選択肢は赤、Player 2
              の選択肢は青で表示されます。好きな名前を付けてください。
            </Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              利得（うれしさ）
            </Heading>
            <Text>
              表の2行目・2列目以降のセルに、Player 1, Player 2
              がそれぞれある選択肢を採ったときにPlayer 1
              がどのくらい嬉しいかを表す値を入力します。0
              を互角の状態として、プラスの値になればなるほど Player 1
              が有利・マイナスの値になればなるほど Player 2
              が有利と考えるとよいです。
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
                、ダメージのやり取りがなければ 0 （格ゲーなど）
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
                  一方、囚人のジレンマのようなゲームはこのアプリでは扱えません。
                </Text>
              </Alert.Description>
            </Alert.Root>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列追加ボタン
            </Heading>
            <Text>
              ボタンを押すと、表の下または右に新しい行・列が追加されます。
            </Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列削除ボタン
            </Heading>
            <Text>ボタンを押すと、該当する行・列が削除されます。</Text>
          </Stack>
          <Stack>
            <Heading size="md" as="h3">
              行・列入れ替えボタン
            </Heading>
            <Text>
              表の右下にある入替ボタンを押すと、Player 1 と Player 2
              の視点を入れ替えます。
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Separator />
      <Stack gap={4}>
        <Heading size="xl" as="h2">
          操作パネル
        </Heading>
        <Text>
          戦略相性表の下にある操作パネルから、計算や共有などの主要な操作を行えます。
        </Text>
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
          <List.Item>行列入替: 表の行と列を入れ替えます。</List.Item>
          <List.Item>リセット: 入力内容を初期状態に戻します。</List.Item>
        </List.Root>
      </Stack>
      <Separator />
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
