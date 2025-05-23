import type { GameInputUI } from "@/types/game";
import { Input, Table } from "@chakra-ui/react";
import React from "react";

interface Props {
  label: string;
  index: number;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const ColHeaderCell: React.FC<Props> = React.memo(
  ({ label, index, setInputUI }: Props) => {
    return (
      <Table.Cell>
        <Input
          w="100%"
          minW="125px"
          variant="outline"
          value={label}
          colorPalette="blue"
          color="blue.fg"
          borderColor="blue.muted"
          bg={{ base: "blue.50", _dark: "blue.950" }}
          onChange={(e) => {
            setInputUI((prev) => {
              const newLabels = [...prev.strategyLabels2];
              newLabels[index] = e.target.value;
              return {
                ...prev,
                strategyLabels2: newLabels,
              };
            });
          }}
        />
      </Table.Cell>
    );
  }
);

export default ColHeaderCell;
