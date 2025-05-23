import type { GameInputUI } from "@/types/game";
import { Input, Table } from "@chakra-ui/react";
import React from "react";

interface Props {
  label: string;
  index: number;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const RowHeaderCell: React.FC<Props> = React.memo(
  ({ label, index, setInputUI }: Props) => {
    return (
      <Table.Cell>
        <Input
          w="100%"
          minW="125px"
          variant="outline"
          value={label}
          colorPalette="red"
          color="red.fg"
          borderColor="red.muted"
          bg={{ base: "red.50", _dark: "red.950" }}
          onChange={(e) => {
            setInputUI((prev) => {
              const newLabels = [...prev.strategyLabels1];
              newLabels[index] = e.target.value;
              return {
                ...prev,
                strategyLabels1: newLabels,
              };
            });
          }}
        />
      </Table.Cell>
    );
  }
);

export default RowHeaderCell;
