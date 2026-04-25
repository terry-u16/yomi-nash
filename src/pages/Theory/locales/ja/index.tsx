import {
  Alert,
  Box,
  Heading,
  Link,
  List,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { BlockMath, InlineMath } from "react-katex";

const TheoryJa: React.FC = () => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              操作方法や基本的な使い方は Help ページを参照してください。Theory
              ページは、アプリで計算している数学的な理論背景を深掘りしたい方向けのページです。
            </Text>
          </Alert.Description>
        </Alert.Root>
        <Stack gap={3}>
          <Heading size="xl" as="h2">
            混合戦略ナッシュ均衡の理論背景
          </Heading>
          <Text>
            ゲーム理論における混合戦略ナッシュ均衡とは、各プレイヤーが複数の選択肢から確率的に選択する戦略（混合戦略）を取っているときに、どちらのプレイヤーも、自分だけ戦略を変えて期待利得を改善することができない状態のことを指します。
            このページでは、アプリが扱う2人ゼロサムゲームに絞って、その定義と計算方法を整理します。
          </Text>
          <Text>
            Help ページでは操作手順や結果の読み方を中心に説明しています。Theory
            ページでは、入力された利得行列からなぜ「おすすめの選択割合」が得られるのかを、数理モデルとして説明します。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            1. アプリが扱うゲーム
          </Heading>
          <Text>
            このアプリでは、Player 1 と Player 2 が同時に 1
            つずつ選択肢を選ぶ状況を扱います。Player 1 の選択肢を{" "}
            <InlineMath math="i = 1,\dots,m" />
            、Player 2 の選択肢を <InlineMath math="j = 1,\dots,n" />{" "}
            とし、Player 1 の利得行列を <InlineMath math="A" /> と書きます。成分{" "}
            <InlineMath math="A_{ij}" /> は、Player 1 が <InlineMath math="i" />
            、Player 2 が <InlineMath math="j" /> を選んだときの Player 1
            視点の利得です。
          </Text>
          <Text>
            このアプリは、Player 2 の利得を <InlineMath math="-A_{ij}" />{" "}
            とみなせるゲームに対象を絞っています。つまり、Player 1
            が得をした分だけ Player 2
            が損をするゼロサムゲームだけを扱います。この前提のもとでは、Player 1
            が期待利得を大きくしようとする問題と、Player 2
            が同じ期待利得を小さくしようとする問題として定式化できます。
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                非ゼロサムゲームでは、両者が同時に得をしたり同時に損をしたりする可能性があります。
                その場合はこのページの minimax
                による定式化だけでは扱えず、別の均衡計算が必要です。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            2. 混合戦略と期待利得
          </Heading>
          <Text>
            純粋戦略は 1
            つの選択肢を確定で選ぶ戦略です。これに対して混合戦略は、
            複数の純粋戦略に確率を割り当てる戦略です。Player 1
            の混合戦略を確率ベクトル <InlineMath math="x" />
            、Player 2 の混合戦略を確率ベクトル <InlineMath math="y" />{" "}
            とすると、それぞれ次の確率制約を満たします。
          </Text>
          <Box overflowX="auto">
            <BlockMath math="x_i \ge 0,\quad \sum_{i=1}^{m} x_i = 1,\qquad y_j \ge 0,\quad \sum_{j=1}^{n} y_j = 1" />
          </Box>
          <Text>
            以降では、このような確率ベクトル全体の集合を{" "}
            <InlineMath math="\Delta_m" /> や <InlineMath math="\Delta_n" />{" "}
            と書きます。
          </Text>
          <Text>このとき Player 1 の期待利得は次のように表せます。</Text>
          <Box overflowX="auto">
            <BlockMath math="u(x,y) = x^{\top} A y = \sum_{i=1}^{m} \sum_{j=1}^{n} x_i A_{ij} y_j" />
          </Box>
          <Text>
            ゼロサムゲームでは Player 2 の期待利得は{" "}
            <InlineMath math="-u(x,y)" /> です。そのため Player 1 は{" "}
            <InlineMath math="u(x,y)" /> を最大化しようとし、Player 2 は{" "}
            <InlineMath math="u(x,y)" /> を最小化しようとします。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            3. ナッシュ均衡の条件
          </Heading>
          <Text>
            混合戦略の組 <InlineMath math="(x^{*}, y^{*})" />{" "}
            がナッシュ均衡であるとは、相手の戦略を固定したときに、自分だけ別の戦略へ変えても期待利得を改善できないことを意味します。2
            人ゼロサムゲームでは次の不等式で表せます。
          </Text>
          <Box overflowX="auto">
            <BlockMath math="u(x, y^{*}) \le u(x^{*}, y^{*}) \le u(x^{*}, y)" />
          </Box>
          <Text>
            左側の不等式は、Player 1 が <InlineMath math="y^{*}" />{" "}
            に対して別の混合戦略 <InlineMath math="x" /> を選んでも、
            <InlineMath math="u(x^{*}, y^{*})" />{" "}
            より高い利得を得られないことを表します。右側の不等式は、Player 2 が{" "}
            <InlineMath math="x^{*}" /> に対して別の混合戦略{" "}
            <InlineMath math="y" /> を選んでも、Player 1 の利得を{" "}
            <InlineMath math="u(x^{*}, y^{*})" />{" "}
            より低くできないことを表します。
          </Text>
          <Text>
            均衡での期待利得 <InlineMath math="u(x^{*}, y^{*})" /> が正なら
            Player 1 に有利、負なら Player 2 に有利、0
            ならこのモデル上は互角と読めます。
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                各プレイヤーの選択肢が有限個であるゲームでは、混合戦略まで含めれば少なくとも
                1 つのナッシュ均衡が存在することが知られています。これは 2
                人ゼロサムゲームに限らない一般的な性質です。このアプリでは、その中でも
                2 人ゼロサムゲームに対象を絞ることで、後述する minimax
                定理と線形計画問題を使って均衡を計算しています。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            4. minimax 定理
          </Heading>
          <Text>
            Player 1 は、Player 2
            が自分にとって最も厳しい反応を選ぶと仮定したうえで、その最悪ケースの利得を最大化します。
            これは maximin 問題として書けます。
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\max_{x \in \Delta_m}\ \min_{y \in \Delta_n} x^{\top} A y" />
          </Box>
          <Text>
            一方 Player 2 は、Player 1
            が自分にとって最も厳しい反応を選ぶと仮定したうえで、Player 1
            の最大利得を最小化します。
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\min_{y \in \Delta_n}\ \max_{x \in \Delta_m} x^{\top} A y" />
          </Box>
          <Text>
            有限 2 人ゼロサムゲームでは minimax 定理により、この 2
            つの値が一致します。
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\max_{x \in \Delta_m}\ \min_{y \in \Delta_n} x^{\top} A y = \min_{y \in \Delta_n}\ \max_{x \in \Delta_m} x^{\top} A y" />
          </Box>
          <Text>
            この共通の期待利得を達成する Player 1 側の最適解{" "}
            <InlineMath math="x^{*}" /> と Player 2 側の最適解{" "}
            <InlineMath math="y^{*}" /> の組が混合戦略ナッシュ均衡になります。
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                minimax
                戦略は、相手がこちらにとって最も厳しい反応を選ぶという悲観的な見積もりのもとで、最悪ケースの期待利得をできるだけ良くする戦略です。
                そのため、相手が均衡から外れた戦略を固定的に取っていると分かっている場合には、その相手に対する最適反応（相手の戦略を固定したとき、自分の期待利得を最大にする戦略）の方が高い期待利得を得られることがあります。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            5. 線形計画問題への変換
          </Heading>
          <Text>
            Player 2 の混合戦略 <InlineMath math="y" />{" "}
            を求める問題を考えます。Player 1 が行 <InlineMath math="i" />{" "}
            を選んだときの期待利得は <InlineMath math="(Ay)_i" /> です。Player 2
            は、どの行を選ばれても Player 1
            の期待利得ができるだけ小さくなるようにしたいので、補助変数{" "}
            <InlineMath math="v" />{" "}
            を使って次の線形計画問題として書くことができます。
          </Text>
          <Box overflowX="auto">
            <BlockMath
              math={String.raw`\begin{aligned}
\text{minimize}\quad & v \\
\text{subject to}\quad & (Ay)_i \le v \quad (i=1,\dots,m) \\
& \sum_{j=1}^{n} y_j = 1 \\
& y_j \ge 0 \quad (j=1,\dots,n)
\end{aligned}`}
            />
          </Box>
          <Text>
            Player 1 側も同様に、各列 <InlineMath math="j" /> に対して期待利得{" "}
            <InlineMath math="(A^{\top}x)_j" /> が補助変数{" "}
            <InlineMath math="w" /> を下回らないようにする問題として書けます。
          </Text>
          <Box overflowX="auto">
            <BlockMath
              math={String.raw`\begin{aligned}
\text{maximize}\quad & w \\
\text{subject to}\quad & (A^{\top}x)_j \ge w \quad (j=1,\dots,n) \\
& \sum_{i=1}^{m} x_i = 1 \\
& x_i \ge 0 \quad (i=1,\dots,m)
\end{aligned}`}
            />
          </Box>
          <Text>
            これらの線形計画問題を解くことで、Player 1 と Player 2
            それぞれの混合戦略が得られます。アプリは入力された利得行列からこの形の問題を作り、数値的に解くことで「おすすめの選択割合」を計算しています。
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            6. 結果を読むときの注意
          </Heading>
          <Text>
            均衡戦略は「相手に確率分布を知られても、一方的に戦略変更して得をされにくい基準点」です。
            ただし、相手が均衡から外れた戦略を固定的に取っていると分かっている場合は、その相手に対する最適反応の方が高い期待利得を出せることがあります。
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              均衡は、相手がこちらの確率を理解して最適に反応してくる前提での基準値です。
            </List.Item>
            <List.Item>
              相手が均衡から外れた戦略を固定的に取っている場合は、スライダーで相手の確率を調整し、各純粋戦略の期待値を比較すると最適反応を探しやすくなります。
            </List.Item>
            <List.Item>
              均衡で正の確率を持つ純粋戦略は、理論上は同じ期待利得になります。正の確率を持たない戦略は、均衡下ではそれ以上の改善をもたらさない戦略です。
            </List.Item>
            <List.Item>
              計算結果は、入力された利得の設計に左右されます。ダメージ、状況、ゲージ、残り時間などをどう数値化するかによって、均衡も変わります。
            </List.Item>
          </List.Root>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                実際の対戦では、相手が均衡戦略を常に選ぶとは限りません。
                均衡は「これだけ選べば常に最大リターンになる戦略」ではなく、読み合いを分析するための基準点として扱うのが良いでしょう。
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            7. もっと学びたい方へ
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
              ：同じく渡辺先生が執筆された書籍です。ナッシュ均衡を含む主要トピックを網羅した入門書で、ゲーム理論の初学者にオススメです。
            </List.Item>
          </List.Root>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TheoryJa;
