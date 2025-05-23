import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbColumnInsertRight } from "react-icons/tb";

interface Props {
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const AddColCell: React.FC<Props> = React.memo(({ setInputUI }: Props) => {
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

  return (
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
  );
});

export default AddColCell;
