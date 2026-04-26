# Yomi Nash

※ English version is available [below](#overview).

## 概要

格闘ゲームの択、じゃんけん、読み合いなどの 2 人対戦ゲームで「どの選択肢をどのくらいの割合で選ぶとよさそうか」を、利得表（戦略相性表）から計算して可視化する Web アプリケーションです。

専門的には、2 人ゼロサムゲームにおける混合戦略ナッシュ均衡を計算します。相手に選択割合を知られても弱みにつけ込まれない、安定した戦略を確認できます。

## こんなときに使えます

- 格闘ゲームの立ち回りやセットプレイで、どの選択肢をどのくらいの割合で使うか考えたい
- 対戦相手の癖を前提に、期待値の高い行動を探したい
- ある読み合いの状況が、自分にとって狙うべき状況か避けるべき状況かを見たい
- 2 人ゼロサムゲームや混合戦略ナッシュ均衡を具体例で学びたい
- 入力した読み合いの内容を CSV や共有 URL で再利用したい

## 使い方

詳しい操作手順や結果の見方は、アプリ内の **Help** ページでも確認できます。README では基本的な流れだけを紹介します。

### 1. 戦略相性表を用意する

Player 1 の選択肢を行に、Player 2 の選択肢を列に入力します。各セルには、その組み合わせになったときに Player 1 がどのくらい得をするかを数値で入力します。

値が大きいほど Player 1 有利、値が小さいほど Player 2 有利、0 なら互角です。例えば、じゃんけんなら Player 1 が勝つ組み合わせを `+1`、負ける組み合わせを `-1`、あいこを `0` として表せます。

最初に試す場合は、サンプルプリセットを読み込むと、入力形式や表の作り方を確認しやすくなります。

### 2. 計算する

操作パネルの計算ボタンを押すと、入力した利得表をもとに混合戦略ナッシュ均衡を計算します。

### 3. 結果を見る

計算結果では、Player 1 / Player 2 が各選択肢をどのくらいの割合で選ぶとよいかを確認できます。

Player 1 の期待値がプラスなら Player 1 有利、マイナスなら Player 1 不利（Player 2 有利）です。各選択肢のスライダーを動かすと、相手の選択割合が偏った場合にどの行動の期待値が上がるかも確認できます。

## 画面構成

- **Home**: 戦略相性表、操作パネル、計算結果をまとめたメイン画面
- **Help**: 操作チュートリアルと読み合いの設定方法を解説
- **Theory**: 混合戦略ナッシュ均衡の理論背景を紹介

## 開発者向け

### 必要環境

- Node.js 18 以上（LTS を推奨）
- pnpm

### セットアップと実行

リポジトリ取得後、依存関係をインストールし開発サーバを起動します。

```bash
pnpm install
pnpm dev
```

ブラウザで `http://localhost:5173` を開いてください。起動中はホットリロードが有効です。

本番ビルドとプレビューは次のコマンドを使用します。

```bash
pnpm build    # 型チェック + Vite ビルド
pnpm preview  # ローカルサーバで確認
```

### 品質チェック

```bash
pnpm lint          # ESLint
pnpm format        # Prettier (整形)
pnpm format:check  # Prettier (確認のみ)
pnpm test          # Vitest (jsdom)
pnpm test:watch    # Vitest watch mode
```

開発方針やコーディング規約の詳細は [AGENTS.md](AGENTS.md) を参照してください。

### ディレクトリ構成（抜粋）

- `src/main.tsx` – アプリのエントリーポイント
- `src/App.tsx` – ルーティング（Home / Help / Theory）
- `src/components/` – レイアウトや共通 UI。`ui/` ディレクトリにテーマ関連の追加コンポーネント
- `src/pages/` – ページごとの画面（Home は細分化されたサブディレクトリ構成）
- `src/lib/` – 言語リソース、プリセット、パーサー、永続化ロジック
- `src/utils/` – CSV／共有ユーティリティや数値処理
- `src/constants/` – スキーマバージョンやストレージキー
- `src/types/` – アプリで使用する共通型定義
- `src/test/utils/` – Vitest 用ユーティリティ
- `public/` – Vite から配信される静的アセット

## ライセンス

MIT License

---

## Overview

Yomi Nash is a web application for calculating and visualizing mixed-strategy Nash equilibria from a payoff table for two-player games such as fighting game mixups, rock-paper-scissors, and other matchup situations.

In technical terms, it solves two-player zero-sum games. It helps you find a stable strategy that cannot be exploited even if the opponent knows your selection probabilities.

## Use Cases

- Decide how often to use each option in fighting game neutral situations, okizeme, or set play
- Find high-expected-value actions against an opponent with known tendencies
- Check whether a matchup situation is worth seeking or avoiding
- Learn two-player zero-sum games and mixed-strategy Nash equilibria through concrete examples
- Reuse matchup settings with CSV import/export or share URLs

## Usage

For detailed tutorials and result explanations, see the in-app **Help** page. This README only covers the basic flow.

### 1. Prepare a payoff table

Enter Player 1's options as rows and Player 2's options as columns. Each cell represents how good that option pair is for Player 1.

Larger values favor Player 1, smaller values favor Player 2, and `0` means even. For rock-paper-scissors, for example, you can use `+1` when Player 1 wins, `-1` when Player 1 loses, and `0` for a draw.

If you are trying the app for the first time, load a sample preset to see how the table is structured.

### 2. Calculate

Press the calculate button in the control panel to compute the mixed-strategy Nash equilibrium for the current payoff table.

### 3. Read the result

The result shows how often Player 1 and Player 2 should choose each option.

If Player 1's expected value is positive, the situation favors Player 1. If it is negative, the situation favors Player 2. You can also adjust the strategy sliders to see which actions gain expected value when the opponent's selection probabilities are biased.

## Pages

- **Home**: Main screen with the payoff table, control panel, and calculation result
- **Help**: Tutorials for using the app and setting up matchup situations
- **Theory**: Mathematical background for mixed-strategy Nash equilibria

## For Developers

### Requirements

- Node.js 18 or later (LTS recommended)
- pnpm

### Setup and Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser. Hot reload is enabled while the dev server is running.

Use the following commands for production builds and local previews:

```bash
pnpm build    # Type check + Vite build
pnpm preview  # Preview the latest build locally
```

### Quality Checks

```bash
pnpm lint          # ESLint
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)
pnpm test          # Vitest (jsdom)
pnpm test:watch    # Vitest watch mode
```

See [AGENTS.md](AGENTS.md) for development guidelines and coding conventions.

### Directory Overview

- `src/main.tsx` – Application entry point
- `src/App.tsx` – Routing for Home / Help / Theory
- `src/components/` – Layout and shared UI. Chakra-related extensions live under `ui/`
- `src/pages/` – Page-level UI. Home is split into focused subdirectories
- `src/lib/` – i18n resources, presets, parsers, and persistence logic
- `src/utils/` – CSV/share helpers and solver utilities
- `src/constants/` – Schema versions and storage keys
- `src/types/` – Shared application types
- `src/test/utils/` – Vitest utilities
- `public/` – Static assets served by Vite

## License

MIT License
