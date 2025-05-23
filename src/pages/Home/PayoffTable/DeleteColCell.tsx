import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbColumnRemove } from "react-icons/tb";

interface Props {
  col: number;
  disabled: boolean;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const DeleteColCell: React.FC<Props> = React.memo(
  ({ col, disabled, setInputUI }: Props) => {
    const deleteCol = (j: number) => {
      setInputUI((prev) => ({
        ...prev,
        strategyLabels2: prev.strategyLabels2.filter((_, idx) => idx !== j),
        payoffMatrix: prev.payoffMatrix.map((row) =>
          row.filter((_, idx) => idx !== j)
        ),
      }));
    };

    return (
      <Table.Cell>
        <Button
          w="100%"
          variant="surface"
          aria-label={`delete column ${col + 1}`}
          disabled={disabled}
          onClick={() => deleteCol(col)}
        >
          <TbColumnRemove /> 列削除
        </Button>
      </Table.Cell>
    );
  }
);

export default DeleteColCell;
