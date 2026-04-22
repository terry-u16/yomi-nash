import { Heading, List, Stack, Text } from "@chakra-ui/react";
import type React from "react";
import { ControlPanelOverviewMock } from "../shared";

const HelpJaControlPanelSection: React.FC = () => {
  return (
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
        <List.Item>シェア: 現在の入力をX（旧Twitter）で共有します。</List.Item>
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
  );
};

export default HelpJaControlPanelSection;
