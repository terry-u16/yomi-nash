import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbRowRemove } from "react-icons/tb";

interface Props {
  row: number;
  disabled: boolean;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const DeleteRowCell: React.FC<Props> = React.memo(
  ({ row, disabled, setInputUI }: Props) => {
    const deleteRow = (i: number) => {
      setInputUI((prev) => ({
        ...prev,
        strategyLabels1: prev.strategyLabels1.filter((_, idx) => idx !== i),
        payoffMatrix: prev.payoffMatrix.filter((_, idx) => idx !== i),
      }));
    };

    return (
      <Table.Cell>
        <Button
          w="100%"
          variant="surface"
          aria-label="delete row"
          disabled={disabled}
          onClick={() => deleteRow(row)}
        >
          <TbRowRemove /> 行削除
        </Button>
      </Table.Cell>
    );
  }
);

export default DeleteRowCell;
