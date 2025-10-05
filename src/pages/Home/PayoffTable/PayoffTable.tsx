import React from "react";
import { Table, Heading, Box, Button } from "@chakra-ui/react";
import type { GameInputUI } from "@/types/game";
import ColHeaderCell from "./ColHeaderCell";
import RowHeaderCell from "./RowHeaderCell";
import ValueCell from "./ValueCell";
import AddRowCell from "./AddRowCell";
import AddColCell from "./AddColCell";
import DeleteRowCell from "./DeleteRowCell";
import DeleteColCell from "./DeleteColCell";
import { toaster } from "@/components/ui/toaster";
import { TbArrowsUpLeft } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const PayoffTable: React.FC<Props> = React.memo(
  ({ inputUI, setInputUI }: Props) => {
    const { strategyLabels1, strategyLabels2, payoffMatrix } = inputUI;
    const { t } = useTranslation();

    const handleTranspose = React.useCallback(() => {
      setInputUI((prev) => {
        const nextRowCount = prev.strategyLabels2.length;
        const nextColCount = prev.strategyLabels1.length;
        const nextPayoffMatrix = nextRowCount
          ? Array.from({ length: nextRowCount }, (_, columnIndex) =>
              Array.from({ length: nextColCount }, (_, rowIndex) => {
                const cell = prev.payoffMatrix[rowIndex]?.[columnIndex] ?? "";
                const trimmed = cell.trim();
                if (trimmed === "") return "";
                const parsed = Number(trimmed);
                if (Number.isNaN(parsed)) return cell;
                const negated = -parsed;
                if (Object.is(negated, -0)) {
                  return "0";
                }
                return `${negated}`;
              })
            )
          : [];

        return {
          strategyLabels1: [...prev.strategyLabels2],
          strategyLabels2: [...prev.strategyLabels1],
          payoffMatrix: nextPayoffMatrix,
        };
      });

      toaster.create({
        title: t("home.payoffTable.transposeToast"),
        type: "success",
      });
    }, [setInputUI, t]);

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          {t("home.payoffTable.heading")}
        </Heading>
        <Table.ScrollArea>
          <Table.Root variant="outline" size="sm">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {t("home.payoffTable.playerHeader", {
                    player1: t("common.player1"),
                    player2: t("common.player2"),
                  })}
                </Table.Cell>
                {strategyLabels2.map((label, j) => (
                  <ColHeaderCell
                    label={label}
                    index={j}
                    setInputUI={setInputUI}
                    key={`col_header_${j + 1}`}
                  />
                ))}
                <AddColCell setInputUI={setInputUI} />
              </Table.Row>
              {strategyLabels1.map((label, i) => (
                <Table.Row key={`row_${i + 1}`}>
                  <RowHeaderCell
                    label={label}
                    index={i}
                    setInputUI={setInputUI}
                    key={`row_header_${i + 1}`}
                  />
                  {payoffMatrix[i].map((val, j) => (
                    <ValueCell
                      value={val}
                      row={i}
                      col={j}
                      setInputUI={setInputUI}
                      key={`cell_${i}_${j}`}
                    />
                  ))}
                  <DeleteRowCell
                    row={i}
                    disabled={strategyLabels1.length <= 1}
                    setInputUI={setInputUI}
                    key={`delete_row_${i + 1}`}
                  />
                </Table.Row>
              ))}
              <Table.Row>
                <AddRowCell setInputUI={setInputUI} />
                {strategyLabels2.map((_, j) => (
                  <DeleteColCell
                    col={j}
                    disabled={strategyLabels2.length <= 1}
                    setInputUI={setInputUI}
                    key={`delete_col_${j + 1}`}
                  />
                ))}
                <Table.Cell>
                  <Button
                    w="100%"
                    variant="surface"
                    onClick={handleTranspose}
                    aria-label={t("home.payoffTable.transposeButton")}
                  >
                    <TbArrowsUpLeft /> {t("home.payoffTable.transposeButton")}
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    );
  }
);

export default PayoffTable;
