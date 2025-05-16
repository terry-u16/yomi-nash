import React, { useState } from "react";
import {
  Table,
  Flex,
  Input,
  NumberInput,
  Field,
  Button,
} from "@chakra-ui/react";
import {
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertBottom,
  TbRowRemove,
} from "react-icons/tb";

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
    setRowLabels([...rowLabels, `選択肢${rowLabels.length + 1}`]);
    setMatrix([...matrix, Array(colLabels.length).fill("0")]);
  };

  const addCol = () => {
    setColLabels([...colLabels, `選択肢${colLabels.length + 1}`]);
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
            <Table.ColumnHeader w="150px" />
            {colLabels.map((label, j) => (
              <Table.ColumnHeader w="150px" key={`header_${j + 1}`}>
                <Input
                  variant="outline"
                  value={label}
                  onChange={(e) => {
                    const newLabels = [...colLabels];
                    newLabels[j] = e.target.value;
                    setColLabels(newLabels);
                  }}
                />
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader>
              <Button
                variant="outline"
                colorPalette="blue"
                aria-label="add column"
                onClick={addCol}
              >
                <TbColumnInsertRight /> 列追加
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
              <Table.Cell key={`delete_row_${i + 1}`}>
                <Button
                  variant="outline"
                  colorPalette="red"
                  aria-label="delete row"
                  onClick={() => deleteRow(i)}
                >
                  <TbRowRemove /> 行削除
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Button
                variant="outline"
                colorPalette="blue"
                aria-label="add row"
                onClick={addRow}
              >
                <TbRowInsertBottom /> 行追加
              </Button>
            </Table.Cell>
            {colLabels.map((_, j) => (
              <Table.Cell key={`delete_col_${j + 1}`}>
                <Button
                  variant="outline"
                  colorPalette="red"
                  aria-label={`delete column ${j + 1}`}
                  onClick={() => deleteCol(j)}
                >
                  <TbColumnRemove /> 列削除
                </Button>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
