import React from "react";
import { Table, Heading, Box } from "@chakra-ui/react";
import type { GameInputUI } from "@/types/game";
import ColHeaderCell from "./ColHeaderCell";
import RowHeaderCell from "./RowHeaderCell";
import ValueCell from "./ValueCell";
import AddRowCell from "./AddRowCell";
import AddColCell from "./AddColCell";
import DeleteRowCell from "./DeleteRowCell";
import DeleteColCell from "./DeleteColCell";

interface Props {
  inputUI: GameInputUI;
  setInputUI: React.Dispatch<React.SetStateAction<GameInputUI>>;
}

const PayoffTable: React.FC<Props> = React.memo(
  ({ inputUI, setInputUI }: Props) => {
    const { strategyLabels1, strategyLabels2, payoffMatrix } = inputUI;

    return (
      <Box p={6} borderRadius="sm" bg="bg.subtle" boxShadow="sm">
        <Heading size="xl" mb={4} as="h2">
          戦略相性表
        </Heading>
        <Table.ScrollArea>
          <Table.Root variant="outline" size="sm">
            <Table.Body>
              <Table.Row>
                <Table.Cell>Player 1 \ Player 2</Table.Cell>
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
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    );
  }
);

export default PayoffTable;
