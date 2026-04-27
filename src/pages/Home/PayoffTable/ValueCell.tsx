import type { GameInputUI } from "@/types/game";
import { Tooltip } from "@/components/ui/tooltip";
import { PAYOFF_MAX, PAYOFF_MIN } from "@/utils/clampGameInput";
import { isValidNumber } from "@/utils/validators/number";
import {
  Field,
  IconButton,
  InputGroup,
  NumberInput,
  Table,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { togglePayoffSign } from "./togglePayoffSign";
import { TbPlusMinus } from "react-icons/tb";

interface Props {
  value: string;
  row: number;
  col: number;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const ValueCell: React.FC<Props> = React.memo(
  ({ value, row, col, setInputUI }: Props) => {
    const { t } = useTranslation();
    const toggleSignLabel = t("home.payoffTable.toggleSign");

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

    const handleToggleSign = () => {
      changeCell(row, col, togglePayoffSign(value));
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
            <InputGroup
              startElement={
                <Tooltip content={toggleSignLabel}>
                  <IconButton
                    aria-label={toggleSignLabel}
                    size="2xs"
                    variant="subtle"
                    color="fg.subtle"
                    tabIndex={-1}
                    onClick={handleToggleSign}
                  >
                    <TbPlusMinus />
                  </IconButton>
                </Tooltip>
              }
              startElementProps={{
                insetInlineStart: "-1",
                pointerEvents: "auto",
              }}
            >
              <NumberInput.Input textAlign="right" />
            </InputGroup>
          </NumberInput.Root>
        </Field.Root>
      </Table.Cell>
    );
  }
);

export default ValueCell;
