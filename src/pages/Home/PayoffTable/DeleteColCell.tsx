import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbColumnRemove } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  col: number;
  disabled: boolean;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const DeleteColCell: React.FC<Props> = React.memo(
  ({ col, disabled, setInputUI }: Props) => {
    const { t } = useTranslation();
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
          aria-label={t("home.payoffTable.deleteCol")}
          disabled={disabled}
          onClick={() => deleteCol(col)}
        >
          <TbColumnRemove /> {t("home.payoffTable.deleteCol")}
        </Button>
      </Table.Cell>
    );
  }
);

export default DeleteColCell;
