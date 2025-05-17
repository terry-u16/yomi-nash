// utils/parseCsvInput.ts
import Papa from "papaparse";
import Encoding from "encoding-japanese";
import type { GameInputUI } from "../types/game";
import { isValidNumber } from "./parseGameInput";

export interface CsvParseSuccess {
  ok: true;
  data: GameInputUI;
}

export interface CsvParseFailure {
  ok: false;
  message: string;
}

export type CsvParseResult = CsvParseSuccess | CsvParseFailure;

function decodeCsvBinary(input: Uint8Array): string {
  const unicodeArray = Encoding.convert(input, {
    to: "UNICODE",
    type: "string",
  });
  return unicodeArray;
}

export function parseCsvInputFromBinary(binary: Uint8Array): CsvParseResult {
  const csvText = decodeCsvBinary(binary);
  return parseCsvInput(csvText);
}

export function parseCsvInput(csvText: string): CsvParseResult {
  const result = Papa.parse<string[]>(csvText.trim(), {
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    return { ok: false, message: "CSVのパース中にエラーが発生しました" };
  }

  const lines = result.data;
  if (!Array.isArray(lines) || lines.length < 2 || lines[0].length < 2) {
    return {
      ok: false,
      message: "CSVが小さすぎます（最低でも1行1列の利得が必要）",
    };
  }

  const colCount = lines[0].length;
  if (!lines.every((row) => row.length === colCount)) {
    return { ok: false, message: "すべての行で列数が揃っていません" };
  }

  const strategyLabels1: string[] = [];
  const strategyLabels2 = lines[0].slice(1);
  const payoffMatrix: string[][] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    const label = row[0];
    const values = row.slice(1).map((cell) => {
      const trimmedCell = cell.trim();
      return isValidNumber(trimmedCell) ? trimmedCell : "";
    });

    strategyLabels1.push(label);
    payoffMatrix.push(values);
  }

  return {
    ok: true,
    data: {
      strategyLabels1,
      strategyLabels2,
      payoffMatrix,
    },
  };
}

export function generateCsvFromGameInputUI(input: GameInputUI): string {
  const headerRow = [""].concat(input.strategyLabels2);
  const dataRows = input.strategyLabels1.map((label, i) => {
    return [label].concat(input.payoffMatrix[i]);
  });
  const allRows = [headerRow, ...dataRows];
  return Papa.unparse(allRows);
}
