import React from "react";
import {
  Table,
  Flex,
  Input,
  NumberInput,
  Field,
  Button,
} from "@chakra-ui/react";
import {
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertBottom,
  TbRowRemove,
} from "react-icons/tb";
import type { GameInputUI } from "@/types/game";
import { isValidNumber } from "@/utils/parseGameInput";
import { PAYOFF_MAX, PAYOFF_MIN } from "@/utils/clampGameInput";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const PayoffTable: React.FC<Props> = ({ inputUI, setInputUI }: Props) => {
  const { strategyLabels1, strategyLabels2, payoffMatrix } = inputUI;

  const changeCell = (row: number, col: number, value: string) => {
    setInputUI((prev) => {
      const newMatrix = [...prev.payoffMatrix.map((r) => [...r])]; // deep copy
      newMatrix[row][col] = value;
      const newInput = { ...prev, payoffMatrix: newMatrix };
      // なぜかclampすると範囲外になったときに表示が壊れる
      // const clamped = clampGameInputUI(newInput);
      return newInput;
    });
  };

  // player1 add
  const addRow = () => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels1: [
        ...prev.strategyLabels1,
        `選択肢${prev.strategyLabels1.length + 1}`,
      ],
      payoffMatrix: [
        ...prev.payoffMatrix,
        Array(prev.strategyLabels2.length).fill("0"),
      ],
    }));
  };

  // player2 add
  const addCol = () => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels2: [
        ...prev.strategyLabels2,
        `選択肢${prev.strategyLabels2.length + 1}`,
      ],
      payoffMatrix: prev.payoffMatrix.map((row) => [...row, "0"]),
    }));
  };

  // player1 delete
  const deleteRow = (i: number) => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels1: prev.strategyLabels1.filter((_, idx) => idx !== i),
      payoffMatrix: prev.payoffMatrix.filter((_, idx) => idx !== i),
    }));
  };

  // player2 delete
  const deleteCol = (j: number) => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels2: prev.strategyLabels2.filter((_, idx) => idx !== j),
      payoffMatrix: prev.payoffMatrix.map((row) =>
        row.filter((_, idx) => idx !== j)
      ),
    }));
  };

  const minW = "130px";

  return (
    <Table.ScrollArea>
      <Table.Root variant="outline" size="sm">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Player 1 ＼ Player 2</Table.Cell>
            {strategyLabels2.map((label, j) => (
              <Table.Cell key={`header_${j + 1}`}>
                <Input
                  w="100%"
                  minW={minW}
                  variant="outline"
                  value={label}
                  colorPalette="blue"
                  color="blue.fg"
                  borderColor="blue.muted"
                  bg={{ base: "blue.50", _dark: "blue.950" }}
                  onChange={(e) => {
                    const newLabels = [...strategyLabels2];
                    newLabels[j] = e.target.value;
                    setInputUI((prev) => ({
                      ...prev,
                      strategyLabels2: newLabels,
                    }));
                  }}
                />
              </Table.Cell>
            ))}
            <Table.Cell>
              <Button
                w="100%"
                variant="surface"
                aria-label="add column"
                onClick={addCol}
              >
                <TbColumnInsertRight /> 列追加
              </Button>
            </Table.Cell>
          </Table.Row>
          {strategyLabels1.map((label, i) => (
            <Table.Row key={`row_${i + 1}`}>
              <Table.Cell>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                >
                  <Input
                    w="100%"
                    minW={minW}
                    variant="outline"
                    colorPalette="red"
                    color="red.fg"
                    borderColor="red.muted"
                    bg={{ base: "red.50", _dark: "red.950" }}
                    value={label}
                    onChange={(e) => {
                      const newLabels = [...strategyLabels1];
                      newLabels[i] = e.target.value;
                      setInputUI((prev) => ({
                        ...prev,
                        strategyLabels1: newLabels,
                      }));
                    }}
                  />
                </Flex>
              </Table.Cell>
              {payoffMatrix[i].map((val, j) => (
                <Table.Cell key={`cell_${i + 1}_${j + 1}`}>
                  <Field.Root invalid={!isValidNumber(val)}>
                    <NumberInput.Root
                      w="100%"
                      minW={minW}
                      value={val}
                      min={PAYOFF_MIN}
                      max={PAYOFF_MAX}
                      onValueChange={(e) => {
                        changeCell(i, j, e.value);
                      }}
                    >
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Field.Root>
                </Table.Cell>
              ))}
              <Table.Cell key={`delete_row_${i + 1}`}>
                <Button
                  w="100%"
                  variant="surface"
                  aria-label="delete row"
                  disabled={strategyLabels1.length <= 1}
                  onClick={() => deleteRow(i)}
                >
                  <TbRowRemove /> 行削除
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Button
                w="100%"
                variant="surface"
                aria-label="add row"
                onClick={addRow}
              >
                <TbRowInsertBottom /> 行追加
              </Button>
            </Table.Cell>
            {strategyLabels2.map((_, j) => (
              <Table.Cell key={`delete_col_${j + 1}`}>
                <Button
                  w="100%"
                  variant="surface"
                  aria-label={`delete column ${j + 1}`}
                  disabled={strategyLabels2.length <= 1}
                  onClick={() => deleteCol(j)}
                >
                  <TbColumnRemove /> 列削除
                </Button>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default PayoffTable;
