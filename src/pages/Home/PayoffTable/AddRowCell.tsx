import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbRowInsertBottom } from "react-icons/tb";

interface Props {
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const AddRowCell: React.FC<Props> = React.memo(({ setInputUI }: Props) => {
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

  return (
    <Table.Cell>
      <Button w="100%" variant="surface" aria-label="add row" onClick={addRow}>
        <TbRowInsertBottom /> 行追加
      </Button>
    </Table.Cell>
  );
});

export default AddRowCell;
