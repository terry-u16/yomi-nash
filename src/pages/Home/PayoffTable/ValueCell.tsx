import type { GameInputUI } from "@/types/game";
import { PAYOFF_MAX, PAYOFF_MIN } from "@/utils/clampGameInput";
import { isValidNumber } from "@/utils/validators/number";
import { Field, NumberInput, Table } from "@chakra-ui/react";
import React from "react";

interface Props {
  value: string;
  row: number;
  col: number;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const ValueCell: React.FC<Props> = React.memo(
  ({ value, row, col, setInputUI }: Props) => {
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

    return (
      <Table.Cell key={`cell_${row + 1}_${col + 1}`}>
        <Field.Root invalid={!isValidNumber(value)}>
          <NumberInput.Root
            w="100%"
            minW="125px"
            value={value}
            min={PAYOFF_MIN}
            max={PAYOFF_MAX}
            onValueChange={(e) => {
              changeCell(row, col, e.value);
            }}
          >
            <NumberInput.Input />
          </NumberInput.Root>
        </Field.Root>
      </Table.Cell>
    );
  }
);

export default ValueCell;
