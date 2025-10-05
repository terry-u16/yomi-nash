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
import { InlineMath } from "react-katex";

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
            4. 混合戦略ナッシュ均衡をどう解くか
          </Heading>
          <Text>
            このアプリが扱う 2 人ゼロサムゲームでは、プレイヤー 1 の利得行列
            <InlineMath math="A" /> を入力として処理します。 行はプレイヤー 1
            の純粋戦略、列はプレイヤー 2 の純粋戦略に対応し、成分
            <InlineMath math="A_{ij}" /> が「プレイヤー 1 が{" "}
            <InlineMath math="i" /> を選び、プレイヤー 2 が{" "}
            <InlineMath math="j" /> を選んだときの利得（プレイヤー 1
            視点）」を表します。 この設定のもとでプレイヤー 2
            が取り得る利得の最大値 <InlineMath math="\max_j" /> を最小化する
            minimax 問題を解くことで、混合戦略ナッシュ均衡を求めます。
            直感的には「こちらがある混合戦略を採用したときに、相手はその戦略に最も刺さる反応（こちらの期待損失を最大化する手）を選ぶ」と悲観的に想定し、その最悪ケースの期待損失を最小化する確率分布を探すという minimax 的な発想です。
          </Text>
          <Text>
            プレイヤー 1 の混合戦略は確率ベクトル{" "}
            <InlineMath math="x = (x_1, \dots, x_M)^{\top}" />{" "}
            として表し、各成分が純粋戦略を選ぶ確率を示します。 目的は{" "}
            <InlineMath math="\max_i (\sum_j A_{ij} x_j)" />{" "}
            を最小化することなので、max 演算を直接扱う代わりに補助変数{" "}
            <InlineMath math="v" /> を導入し、全ての行 <InlineMath math="i" />{" "}
            について <InlineMath math="v \ge \sum_j A_{ij} x_j" />{" "}
            という制約を課すと、
            <InlineMath math="v" /> を最小化する問題に書き換えられます。
            <InlineMath math="x" /> は確率ベクトルなので{" "}
            <InlineMath math="x_j \ge 0" /> と
            <InlineMath math="\sum_j x_j = 1" />{" "}
            という確率制約を併せて課し、その制約付き線形計画問題を{" "}
            <code>glpk.js</code> のソルバーに渡して 最適な混合戦略{" "}
            <InlineMath math="x" /> と均衡値 <InlineMath math="v" />{" "}
            を数値的に計算しています。
          </Text>
          <Text>
            プレイヤー 2 側は利得行列を転置して符号を反転させた{" "}
            <InlineMath math="-A^{\top}" />{" "}
            を用いて同じ形式の問題に落とし込み、同様に線形計画問題として解きます。
            こうして得た 2
            つの戦略が互いの最適反応となる点、すなわち混合戦略ナッシュ均衡が最終的な出力です。
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                ここで紹介した minimax による定式化は、各組み合わせの利得が常に
                <InlineMath math="(A_{ij}, -A_{ij})" /> のように総和ゼロになる 2
                人ゼロサムゲームを前提としています。
                非ゼロサムや複数人ゲームでは別の手法が必要になる点に注意してください。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            5. もっと学びたい方へ
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
