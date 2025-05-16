import React, { useState } from "react";
import {
  Table,
  IconButton,
  Flex,
  Input,
  NumberInput,
  Field,
  Button,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";

export default function PayoffTable() {
  const [rowLabels, setRowLabels] = useState(["中段択", "下段択", "様子見"]);
  const [colLabels, setColLabels] = useState([
    "立ちガード",
    "しゃがみガード",
    "無敵技",
  ]);
  const [matrix, setMatrix] = useState([
    ["0", "3860", "-1500"],
    ["4740", "0", "-1500"],
    ["0", "0", "6150"],
  ]);

  const updateCell = (i: number, j: number, val: string) => {
    setMatrix((prev) => {
      const next = [...prev];
      next[i] = [...next[i]];
      next[i][j] = val;
      return next;
    });
  };

  const addRow = () => {
    setRowLabels([...rowLabels, `戦略${rowLabels.length + 1}`]);
    setMatrix([...matrix, Array(colLabels.length).fill("0")]);
  };

  const addCol = () => {
    setColLabels([...colLabels, `戦略${colLabels.length + 1}`]);
    setMatrix(matrix.map((row) => [...row, "0"]));
  };

  const deleteRow = (i: number) => {
    setRowLabels(rowLabels.filter((_, idx) => idx !== i));
    setMatrix(matrix.filter((_, idx) => idx !== i));
  };

  const deleteCol = (j: number) => {
    setColLabels(colLabels.filter((_, idx) => idx !== j));
    setMatrix(matrix.map((row) => row.filter((_, idx) => idx !== j)));
  };

  const isNumber = (val: string) => {
    const num = parseFloat(val);
    return !isNaN(num) && isFinite(num);
  };

  return (
    <Table.ScrollArea>
      <Table.Root variant="outline" size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="200px" />
            {colLabels.map((label, j) => (
              <Table.ColumnHeader w="200px" key={`header_${j + 1}`}>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                >
                  <Input
                    variant="outline"
                    value={label}
                    onChange={(e) => {
                      const newLabels = [...colLabels];
                      newLabels[j] = e.target.value;
                      setColLabels(newLabels);
                    }}
                  />
                  <IconButton
                    variant="surface"
                    aria-label={`delete column ${j + 1}`}
                    onClick={() => deleteCol(j)}
                    ml={2}
                  >
                    <MdDelete />
                  </IconButton>
                </Flex>
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader>
              <Button
                variant="surface"
                aria-label="add column"
                onClick={addCol}
              >
                <MdAdd /> 列追加
              </Button>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rowLabels.map((label, i) => (
            <Table.Row key={`row_${i + 1}`}>
              <Table.Cell>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                >
                  <Input
                    variant="outline"
                    value={label}
                    onChange={(e) => {
                      const newLabels = [...rowLabels];
                      newLabels[i] = e.target.value;
                      setRowLabels(newLabels);
                    }}
                  />
                  <IconButton
                    variant="surface"
                    aria-label={`delete row ${i + 1}`}
                    onClick={() => deleteRow(i)}
                    ml={2}
                  >
                    <MdDelete />
                  </IconButton>
                </Flex>
              </Table.Cell>
              {matrix[i].map((val, j) => (
                <Table.Cell key={`cell_${i + 1}_${j + 1}`}>
                  <Field.Root invalid={!isNumber(val)}>
                    <NumberInput.Root>
                      <NumberInput.Label />
                      <NumberInput.Scrubber />
                      <NumberInput.Input
                        value={val}
                        onChange={(e) => updateCell(i, j, e.target.value)}
                      />
                    </NumberInput.Root>
                  </Field.Root>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Button variant="surface" aria-label="add row" onClick={addRow}>
                <MdAdd /> 行追加
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
