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

const Theory: React.FC = () => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              操作方法や基本的な使い方は{" "}
              <Highlight query="Help" styles={{ px: "0.5", bg: "red.muted" }}>
                Help
              </Highlight>{" "}
              を参照してください。Theory
              は、アプリで計算している理論背景を深掘りしたい方向けのページです。
            </Text>
          </Alert.Description>
        </Alert.Root>
        <Stack gap={3}>
          <Heading size="xl" as="h2">
            ナッシュ均衡を格ゲーに活かす
          </Heading>
          <Text>
            <Highlight
              query="混合戦略ナッシュ均衡"
              styles={{ px: "0.5", bg: "red.muted" }}
            >
              混合戦略ナッシュ均衡
            </Highlight>
            とは、各プレイヤーが複数の行動を確率で混ぜる（混合戦略）ときに、互いが自分の確率を一方的に変えても平均的な見返りが良くならない安定状態（ナッシュ均衡）のことです。
          </Text>
          <Text>
            「混合戦略」は行動をランダムに切り替える戦い方、「ナッシュ均衡」は相手に手の内を知られても変える必要がない戦略の組を指します。格ゲーでは固有の行動やゲージ状況が絡むため、机上の確率だけでなく状況評価を含めて活用することが重要です。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            1. 状況をゲームとして定義する
          </Heading>
          <Text>
            読み合いをナッシュ均衡で扱うには、選択肢と利得を具体的に定義します。主に以下の点を整理するとスムーズです。
          </Text>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              Player 1 / Player 2
              が同時に選ぶ行動の集合（例：暴れ、投げ、様子見、バクステ など）
            </List.Item>
            <List.Item>
              各行動の組み合わせが成立したときの結果（ヒット、ガード、投げ抜け 等）
            </List.Item>
            <List.Item>
              結果から計算する利得（与ダメージ、位置取り、起き攻め継続、ゲージ獲得量
              などの総合評価）
            </List.Item>
          </List.Root>
          <Text>
            利得はダメージ単体でも構いませんが、起き攻め継続で+20、画面端脱出で+15のように数値化すると、実戦的なバランスになります。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            2. 均衡が示すものを読み解く
          </Heading>
          <Text>
            アプリで計算した確率分布は、「その場で無限に読み合いが繰り返された場合の長期的なミックス」を表します。ただし、実戦では読み切りやリスクを取った一発読みも混ざるため、以下のように解釈します。
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              均衡の確率を基準値として、相手の癖に応じて微調整する（均衡 30% の行動を、相手がビビっているなら 40% に増やす 等）
            </List.Item>
            <List.Item>
              均衡で利得がマイナスのときは、そもそもその読み合いに付き合わない動線を研究する
            </List.Item>
            <List.Item>
              均衡の利得がゼロ付近ならミックス継続、プラスなら積極的にその状況を作る
            </List.Item>
            <List.Item>
              相手が均衡から大きく逸脱しているときは、搾取（exploit）を狙って確率をずらし平均利得を稼ぐ。ただし相手が気付き順応してくるリスクも想定する
            </List.Item>
          </List.Root>
          <Text>
            均衡は「お互いが最善を尽くしたときの基準値」であり、搾取は「相手のミスや偏りを突いて短期的に期待値を伸ばす手段」です。対戦では、相手の反応を観察しつつ、均衡へ戻すタイミングと搾取を狙うタイミングを切り替えることで、安定感と爆発力のバランスを取れます。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            3. 練習と対策への落とし込み
          </Heading>
          <Text>
            均衡確率を手元に置いておくことで、トレモや対策会で得られる具体的なアクションが増えます。
          </Text>
          <List.Root ps={4} as="ol" listStyle="decimal">
            <List.Item>
              反撃が重い選択肢は確率を抑える。このとき別の選択肢で期待値を確保できるか確認する
            </List.Item>
            <List.Item>
              被起き攻め側は、均衡で許容される暴れやバクステの回数を把握し、体力リード時に強気に使うプランを立てる
            </List.Item>
            <List.Item>
              起き攻め側は、均衡確率より高い頻度で無敵技を撃つ相手に対して、リスクを減らすフォロー行動を準備する
            </List.Item>
          </List.Root>
          <Text>
            数値をもとに「この状況は1回博打を通せば平均で ○○
            ダメージ得するから粘ろう」といった判断ができ、練習の優先順位づけにも役立ちます。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            4. 応用例
          </Heading>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              画面端の攻防で、投げと打撃の比率を計算し、根性ガードを崩すための最適なミックスを設計する
            </List.Item>
            <List.Item>
              無敵技を持たないキャラ相手に、起き攻め択を細分化して重ね＋ディレイ＋投げの確率を算出する
            </List.Item>
            <List.Item>
              ゲージ管理込みで「CA
              を吐くと均衡がどう変わるか」を比較し、コンボ選択の指針にする
            </List.Item>
          </List.Root>
          <Text>
            均衡は勝敗を保証する魔法の数式ではありませんが、読み合いの「基準」を定量化できる強力なツールです。アプリで算出した値をノートやスプレッドシートに記録し、実戦での手応えと照らし合わせながらアップデートしていくと理解が深まります。
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Theory;
