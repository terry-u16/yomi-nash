import { Alert, Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import { PayoffTableOverviewMock } from "../shared";

const HelpJaPayoffTableSection: React.FC = () => {
  return (
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
            Player 1, Player 2 がそれぞれある選択肢を選んだときに、Player 1
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
              上記に加えて、その後の状況の良さ（起き攻め・有利フレーム・画面位置・ゲージ状況など）を加味した値にする
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
                が損をする」という設定のゲームを、2人ゼロサムゲームと呼びます。純粋に勝利のみを目的とする2人対戦ゲームは2人ゼロサムゲームに含まれると考えて良いでしょう。一方、囚人のジレンマのような非ゼロサムゲームはこのアプリでは扱えません。
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
  );
};

export default HelpJaPayoffTableSection;
