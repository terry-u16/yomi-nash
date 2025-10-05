import {
  Alert,
  Box,
  Heading,
  Highlight,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";

const Theory: React.FC = () => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              操作方法や基本的な使い方は Help ページを参照してください。Theory
              ページは、アプリで計算している理論背景を深掘りしたい方向けのページです。
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
            「混合戦略」は行動をある確率でランダムに切り替える戦い方、「ナッシュ均衡」は相手に手の内を知られても変える必要がない戦略の組を指します。
            格ゲーでは相手の癖を読んで偏りを突く「搾取」と、読まれても崩れない「均衡」のバランスが重要となります。
            そのため、均衡の考え方は、読み合いの基準点や反応の変化を測る物差しとして活用できます。
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
              各行動の組み合わせが成立したときの結果（ヒット、ガード、投げ抜け
              等）
            </List.Item>
            <List.Item>
              結果から計算する利得（与ダメージ、位置取り、起き攻め継続、ゲージ獲得量
              などの総合評価）
            </List.Item>
          </List.Root>
          <Text>
            利得はダメージ単体でも構いませんが、起き攻め継続で+20、画面端に押し込まれることで-15のように数値化すると、より実戦的な評価ができます。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            2. 均衡確率の読み取り方
          </Heading>
          <Text>
            アプリで計算される確率分布は、「相手に行動がバレていても損しないように選ぶ行動の割合」を示しています。
            このような状態をナッシュ均衡と呼び、いわば「読み合いの土台となる安定した戦略の組み合わせ」です。
          </Text>
          <Text>
            この均衡状態での利得は、「お互いに相手の行動傾向を理解したうえで、もうこれ以上有利にならない最適な選択をしたときの平均的な成果」です。
            実戦ではこの基準から意図的にずらすことで搾取（exploit）を狙ったり、あえて偏らせて印象を植え付けたりといった戦術が重要になります。
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              均衡の確率を基準値として、相手の癖に応じて微調整する（均衡 30%
              の行動を、相手がビビっているなら 40% に増やす 等）
            </List.Item>
            <List.Item>
              均衡の利得がプラスなら、積極的にその状況を作る
            </List.Item>
            <List.Item>
              均衡で利得がマイナスのときは、そもそもその読み合いに付き合わない
            </List.Item>
            <List.Item>
              相手が均衡から大きく逸脱しているときは、搾取を狙って確率をずらし平均利得を稼ぐ。ただし相手が気付き対応してくるリスクも想定する
            </List.Item>
          </List.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            3. 混合戦略ナッシュ均衡の実戦での活用例
          </Heading>
          <Text>
            均衡から得られる確率を頭に入れておくと、各状況での読み合いに「数字という基準」が生まれます。
            「何をどれくらいやっていいのか」が見えることで、相手から搾取されるリスクを減らし、安定して勝率を上げることができます。
            均衡は勝利を保証する“正解”ではありませんが、状況判断の「ものさし」として非常に強力です。
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              リスクが高い選択肢（例：無敵技など）は基本的には確率を抑えつつも、あまり抑えすぎると相手が増長するので、均衡確率で少し混ぜることで相手に様子見をさせて攻めを和らげることができる。
            </List.Item>
            <List.Item>
              起き攻め側は、無敵技を均衡より多く選択してくる相手に対し、様子見を多めに混ぜることで搾取を狙う。
            </List.Item>
            <List.Item>
              人読みの研究を行うときに、相手の行動傾向を均衡確率と比較した上で、どの選択肢が最も期待値が高くなるかを把握しておく。
            </List.Item>
          </List.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            4. もっと学びたい方へ
          </Heading>
          <Text>
            混合戦略ナッシュ均衡の理論背景をより体系的に学びたい方は、以下の資料が参考になります。
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              <Link
                href="https://nabenavi.net/nash-equilibrium/"
                colorPalette="blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                渡辺先生によるナッシュ均衡の解説記事 <TbExternalLink />
              </Link>
              ：ナッシュ均衡の概要について分かりやすく説明されています。その他にも多数の解説記事があります。
            </List.Item>
            <List.Item>
              <Link
                href="https://amzn.to/4mOnGEO"
                colorPalette="blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                書籍『一歩ずつ学ぶ ゲーム理論 -数理で導く戦略的意思決定-』{" "}
                <TbExternalLink />
              </Link>
              ：ナッシュ均衡を含む主要トピックを網羅した入門書で、ゲーム理論の初学者にオススメです。
            </List.Item>
          </List.Root>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Theory;
