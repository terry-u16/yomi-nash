import type { GameInputUI } from "@/types/game";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import { TbColumnInsertRight } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const AddColCell: React.FC<Props> = React.memo(({ setInputUI }: Props) => {
  const { t } = useTranslation();
  // player2 add
  const addCol = () => {
    setInputUI((prev) => ({
      ...prev,
      strategyLabels2: [
        ...prev.strategyLabels2,
        t("common.optionLabel", { index: prev.strategyLabels2.length + 1 }),
      ],
      payoffMatrix: prev.payoffMatrix.map((row) => [...row, "0"]),
    }));
  };

  return (
    <Table.Cell>
      <Button
        w="100%"
        variant="surface"
        aria-label={t("home.payoffTable.addCol")}
        onClick={addCol}
      >
        <TbColumnInsertRight /> {t("home.payoffTable.addCol")}
      </Button>
    </Table.Cell>
  );
});

export default AddColCell;
