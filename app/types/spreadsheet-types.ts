export type CellData = {
  value: string;
  formula?: string;
};

export type SpreadsheetData = {
  [key: string]: CellData;
};
