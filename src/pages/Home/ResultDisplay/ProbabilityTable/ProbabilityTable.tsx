import type { GameResult } from "@/types/game";
import { Box, Text, Heading, Table } from "@chakra-ui/react";
import React from "react";
import ProbabilityCell from "./ProbabilityCell";

interface Props {
  result: GameResult;
  maxAbsPayoff: number;
}

const ProbabilityTable: React.FC<Props> = React.memo(
  ({ result, maxAbsPayoff }: Props) => {
    return (
      <Box>
        <Heading size="lg" as="h3" mb={2}>
          発生確率一覧
        </Heading>
        <Table.ScrollArea>
          <Table.Root
            variant="outline"
            size="sm"
            style={{ tableLayout: "fixed" }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w="150px">
                  Player 1 ＼ Player 2
                </Table.ColumnHeader>
                {result.player2Strategy.map((entry, j) => (
                  <Table.ColumnHeader w="150px" key={`header_${j + 1}`}>
                    <Text truncate>{entry.label}</Text>
                  </Table.ColumnHeader>
                ))}
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
                      <ProbabilityCell
                        strategy1={row}
                        strategy2={col}
                        payoff={result.payoffMatrix12[i][j]}
                        maxAbsPayoff={maxAbsPayoff}
                        key={`cell_${i}_${j}`}
                      />
                    );
                  })}
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell>
                  <Text truncate>TODO: 合計</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    );
  }
);

export default ProbabilityTable;
