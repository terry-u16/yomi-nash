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

const TheoryEn: React.FC = () => {
  return (
    <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
      <Stack gap={6}>
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Description>
            <Text>
              See the Help page for operation details and basic usage. The
              Theory page is for users who want to understand the mathematical
              background behind the calculations in this app.
            </Text>
          </Alert.Description>
        </Alert.Root>
        <Stack gap={3}>
          <Heading size="xl" as="h2">
            The Theory Behind Mixed-Strategy Nash Equilibria
          </Heading>
          <Text>
            In game theory, a mixed-strategy Nash equilibrium is a state where
            each player chooses probabilistically among multiple options, and no
            player can improve their expected payoff by changing only their own
            strategy. This page focuses on two-player zero-sum games, which are
            the games handled by this app, and summarizes their definition and
            computation.
          </Text>
          <Text>
            The Help page focuses on how to use the app and interpret the
            results. This Theory page explains, as a mathematical model, why the
            recommended selection probabilities are obtained from the input
            payoff matrix.
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            1. Games Handled by This App
          </Heading>
          <Text>
            This app handles situations where Player 1 and Player 2 each choose
            one option simultaneously. Let Player 1&apos;s options be{" "}
            <InlineMath math="i = 1,\dots,m" /> and Player 2&apos;s options be{" "}
            <InlineMath math="j = 1,\dots,n" />. The payoff matrix for Player 1
            is written as <InlineMath math="A" />. Each entry{" "}
            <InlineMath math="A_{ij}" /> is Player 1&apos;s payoff when Player 1
            chooses <InlineMath math="i" /> and Player 2 chooses{" "}
            <InlineMath math="j" />.
          </Text>
          <Text>
            This app is limited to games where Player 2&apos;s payoff can be
            treated as <InlineMath math="-A_{ij}" />. In other words, it handles
            only zero-sum games, where Player 2 loses exactly as much as Player
            1 gains. Under this assumption, the game can be formulated as a
            problem where Player 1 tries to increase the expected payoff and
            Player 2 tries to decrease that same expected payoff.
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                In non-zero-sum games, both players can gain or lose at the same
                time. Those games cannot be handled by the minimax formulation
                described on this page alone, and require different equilibrium
                computation methods.
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            2. Mixed Strategies and Expected Payoff
          </Heading>
          <Text>
            A pure strategy chooses one option with certainty. A mixed strategy
            assigns probabilities to multiple pure strategies. If Player
            1&apos;s mixed strategy is the probability vector{" "}
            <InlineMath math="x" /> and Player 2&apos;s mixed strategy is the
            probability vector <InlineMath math="y" />, they satisfy the
            following probability constraints.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="x_i \ge 0,\quad \sum_{i=1}^{m} x_i = 1,\qquad y_j \ge 0,\quad \sum_{j=1}^{n} y_j = 1" />
          </Box>
          <Text>
            We write the sets of all such probability vectors as{" "}
            <InlineMath math="\Delta_m" /> and <InlineMath math="\Delta_n" />.
          </Text>
          <Text>
            Player 1&apos;s expected payoff is then written as follows.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="u(x,y) = x^{\top} A y = \sum_{i=1}^{m} \sum_{j=1}^{n} x_i A_{ij} y_j" />
          </Box>
          <Text>
            In a zero-sum game, Player 2&apos;s expected payoff is{" "}
            <InlineMath math="-u(x,y)" />. Therefore Player 1 tries to maximize{" "}
            <InlineMath math="u(x,y)" />, while Player 2 tries to minimize{" "}
            <InlineMath math="u(x,y)" />.
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            3. Nash Equilibrium Conditions
          </Heading>
          <Text>
            A pair of mixed strategies <InlineMath math="(x^{*}, y^{*})" /> is a
            Nash equilibrium when, after fixing the opponent&apos;s strategy,
            neither player can improve their expected payoff by changing only
            their own strategy. In a two-player zero-sum game, this can be
            written as the following inequality.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="u(x, y^{*}) \le u(x^{*}, y^{*}) \le u(x^{*}, y)" />
          </Box>
          <Text>
            The left inequality means that Player 1 cannot obtain a higher
            payoff than <InlineMath math="u(x^{*}, y^{*})" /> by choosing
            another mixed strategy <InlineMath math="x" /> against{" "}
            <InlineMath math="y^{*}" />. The right inequality means that Player
            2 cannot reduce Player 1&apos;s payoff below{" "}
            <InlineMath math="u(x^{*}, y^{*})" /> by choosing another mixed
            strategy <InlineMath math="y" /> against <InlineMath math="x^{*}" />
            .
          </Text>
          <Text>
            If the equilibrium expected payoff{" "}
            <InlineMath math="u(x^{*}, y^{*})" /> is positive, the model favors
            Player 1. If it is negative, it favors Player 2. If it is 0, the
            game is even under this model.
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                In games with finitely many options for each player, at least
                one Nash equilibrium is known to exist when mixed strategies are
                allowed. This is a general property, not limited to two-player
                zero-sum games. This app focuses on two-player zero-sum games so
                that equilibria can be computed using the minimax theorem and
                linear programming described below.
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            4. Minimax Theorem
          </Heading>
          <Text>
            Player 1 assumes that Player 2 will choose the harshest response and
            maximizes the payoff in that worst case. This is written as the
            maximin problem.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\max_{x \in \Delta_m}\ \min_{y \in \Delta_n} x^{\top} A y" />
          </Box>
          <Text>
            Conversely, Player 2 assumes that Player 1 will choose the harshest
            response and minimizes Player 1&apos;s maximum payoff.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\min_{y \in \Delta_n}\ \max_{x \in \Delta_m} x^{\top} A y" />
          </Box>
          <Text>
            For finite two-player zero-sum games, the minimax theorem states
            that these two values are equal.
          </Text>
          <Box overflowX="auto">
            <BlockMath math="\max_{x \in \Delta_m}\ \min_{y \in \Delta_n} x^{\top} A y = \min_{y \in \Delta_n}\ \max_{x \in \Delta_m} x^{\top} A y" />
          </Box>
          <Text>
            The pair consisting of Player 1&apos;s optimal solution{" "}
            <InlineMath math="x^{*}" /> and Player 2&apos;s optimal solution{" "}
            <InlineMath math="y^{*}" />, which achieves this common expected
            payoff, is a mixed-strategy Nash equilibrium.
          </Text>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                A minimax strategy improves the worst-case expected payoff under
                the pessimistic assumption that the opponent chooses the
                harshest response. If you know that the opponent is fixed on a
                strategy outside the equilibrium, a best response to that fixed
                strategy can sometimes achieve a higher expected payoff.
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            5. Conversion to Linear Programming
          </Heading>
          <Text>
            Consider the problem of finding Player 2&apos;s mixed strategy{" "}
            <InlineMath math="y" />. If Player 1 chooses row{" "}
            <InlineMath math="i" />, the expected payoff is{" "}
            <InlineMath math="(Ay)_i" />. Player 2 wants Player 1&apos;s
            expected payoff to be as small as possible no matter which row is
            chosen, so this can be written as the following linear program using
            an auxiliary variable <InlineMath math="v" />.
          </Text>
          <Box overflowX="auto">
            <BlockMath
              math="\begin{aligned}
\text{minimize}\quad & v \\
\text{subject to}\quad & (Ay)_i \le v \quad (i=1,\dots,m) \\
& \sum_{j=1}^{n} y_j = 1 \\
& y_j \ge 0 \quad (j=1,\dots,n)
\end{aligned}"
            />
          </Box>
          <Text>
            Player 1&apos;s side can similarly be written as a problem where the
            expected payoff <InlineMath math="(A^{\top}x)_j" /> for each column{" "}
            <InlineMath math="j" /> must not fall below an auxiliary variable{" "}
            <InlineMath math="w" />.
          </Text>
          <Box overflowX="auto">
            <BlockMath
              math="\begin{aligned}
\text{maximize}\quad & w \\
\text{subject to}\quad & (A^{\top}x)_j \ge w \quad (j=1,\dots,n) \\
& \sum_{i=1}^{m} x_i = 1 \\
& x_i \ge 0 \quad (i=1,\dots,m)
\end{aligned}"
            />
          </Box>
          <Text>
            Solving these linear programs yields the mixed strategies for Player
            1 and Player 2. The app constructs this form of problem from the
            input payoff matrix and solves it numerically to compute the
            recommended selection probabilities.
          </Text>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            6. Notes on Reading the Results
          </Heading>
          <Text>
            Equilibrium strategies are a baseline that remains difficult for the
            opponent to exploit even if they know your probability distribution.
            However, if you know that the opponent is fixed on a strategy
            outside the equilibrium, a best response to that opponent can
            sometimes produce a higher expected payoff.
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              The equilibrium is a baseline value under the assumption that the
              opponent understands your probabilities and responds optimally.
            </List.Item>
            <List.Item>
              If the opponent is fixed on a strategy outside the equilibrium,
              adjust the opponent&apos;s probabilities with the sliders and
              compare the expected value of each pure strategy to find a best
              response.
            </List.Item>
            <List.Item>
              Pure strategies with positive probability in equilibrium have the
              same expected payoff in theory. Strategies with zero probability
              do not provide further improvement under the equilibrium.
            </List.Item>
            <List.Item>
              The computed result depends on the payoff design. The equilibrium
              changes depending on how you quantify damage, position, meter,
              remaining time, and other factors.
            </List.Item>
          </List.Root>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Description>
              <Text>
                In real matches, the opponent will not always choose an
                equilibrium strategy. Treat the equilibrium not as a strategy
                that always maximizes return, but as a baseline for analyzing
                guessing situations.
              </Text>
            </Alert.Description>
          </Alert.Root>
        </Stack>
        <Separator />
        <Stack gap={4}>
          <Heading size="lg" as="h3">
            7. Further Reading
          </Heading>
          <Text>
            The following resources are useful if you want to learn the theory
            behind mixed-strategy Nash equilibria more systematically. Please
            note that both linked resources are available in Japanese only.
          </Text>
          <List.Root ps={4} as="ul" listStyle="disc">
            <List.Item>
              <Link
                href="https://nabenavi.net/nash-equilibrium/"
                colorPalette="blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watanabe&apos;s article explaining Nash equilibrium{" "}
                <TbExternalLink />
              </Link>
              : A clear overview of Nash equilibrium, alongside many other
              explanatory articles.
            </List.Item>
            <List.Item>
              <Link
                href="https://amzn.to/4mOnGEO"
                colorPalette="blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book: Learning Game Theory Step by Step <TbExternalLink />
              </Link>
              : An introductory book by Watanabe covering major game-theory
              topics including Nash equilibrium.
            </List.Item>
          </List.Root>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TheoryEn;
