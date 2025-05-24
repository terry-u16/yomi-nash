import type { GameResult } from "@/types/game";
import { Box, Text, Heading, Table } from "@chakra-ui/react";
import React from "react";
import ResultCell from "./ResultCell";
import SumCell from "./SumCell";
import { transposeMatrix } from "@/utils/solveGameInput";

interface Props {
  result: GameResult;
  maxAbsPayoff: number;
}

const ResultTable: React.FC<Props> = React.memo(
  ({ result, maxAbsPayoff }: Props) => {
    const expectedSumRow = result.payoffMatrix.map((val) =>
      val.reduce(
        (acc, v, j) => acc + v * result.player2Strategy[j].probability,
        0
      )
    );

    const expectedSumCol = transposeMatrix(result.payoffMatrix).map((val) =>
      val.reduce(
        (acc, v, i) => acc + v * result.player1Strategy[i].probability,
        0
      )
    );

    const expectedSum = expectedSumRow.reduce(
      (acc, v, i) => acc + v * result.player1Strategy[i].probability,
      0
    );

    return (
      <Box>
        <Heading size="lg" as="h3" mb={2}>
          結果一覧表
        </Heading>
        <Table.ScrollArea>
          <Table.Root
            variant="outline"
            size="sm"
            showColumnBorder
            style={{ tableLayout: "fixed" }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w="150px">
                  Player 1 \ Player 2
                </Table.ColumnHeader>
                {result.player2Strategy.map((entry, j) => (
                  <Table.ColumnHeader w="150px" key={`header_${j + 1}`}>
                    <Text truncate>{entry.label}</Text>
                  </Table.ColumnHeader>
                ))}
                <Table.ColumnHeader w="150px">合計</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {result.player1Strategy.map((row, i) => (
                <Table.Row key={`row_${i + 1}`}>
                  <Table.Cell>
                    <Text truncate>{row.label}</Text>
                  </Table.Cell>
                  {result.player2Strategy.map((col, j) => {
                    return (
                      <ResultCell
                        strategy1={row}
                        strategy2={col}
                        payoff={result.payoffMatrix[i][j]}
                        maxAbsPayoff={maxAbsPayoff}
                        key={`cell_${i}_${j}`}
                      />
                    );
                  })}
                  <SumCell
                    prob={result.player1Strategy[i].probability}
                    payoff={expectedSumRow[i]}
                    maxAbsPayoff={maxAbsPayoff}
                    key={`row_sum_${i}`}
                  />
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell>
                  <Text truncate>合計</Text>
                </Table.Cell>
                {result.player2Strategy.map((col, j) => {
                  return (
                    <SumCell
                      prob={col.probability}
                      payoff={expectedSumCol[j]}
                      maxAbsPayoff={maxAbsPayoff}
                      key={`col_sum_${j}`}
                    />
                  );
                })}
                <SumCell
                  prob={1}
                  payoff={expectedSum}
                  maxAbsPayoff={maxAbsPayoff}
                />
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    );
  }
);

export default ResultTable;
