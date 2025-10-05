import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbRowInsertBottom } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const AddRowCell: React.FC<Props> = React.memo(({ setInputUI }: Props) => {
  const { t } = useTranslation();

  const addRow = () => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels1: [
        ...prev.strategyLabels1,
        t("common.optionLabel", { index: prev.strategyLabels1.length + 1 }),
      ],
      payoffMatrix: [
        ...prev.payoffMatrix,
        Array(prev.strategyLabels2.length).fill("0"),
      ],
    }));
  };

  return (
    <Table.Cell>
      <Button
        w="100%"
        variant="surface"
        aria-label={t("home.payoffTable.addRow")}
        onClick={addRow}
      >
        <TbRowInsertBottom /> {t("home.payoffTable.addRow")}
      </Button>
    </Table.Cell>
  );
});

export default AddRowCell;
