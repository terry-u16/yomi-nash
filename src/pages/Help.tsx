import {
  Alert,
  Box,
  Heading,
  Highlight,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

const Help: React.FC = () => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>
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
                がどのくらい嬉しいかを表す値を入力します。0 を互角の状態として、
                プラスの値になればなるほど Player 1
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
                    が損をする」という設定のゲームを、2人ゼロサムゲームと呼びます。
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Help;
