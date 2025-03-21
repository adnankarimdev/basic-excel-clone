// Helper functions for spreadsheet calculations and formatting

export const getColumnLabel = (index: number): string => {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode(65 + (index % 26)) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export const getCellRef = (row: number, col: number): string => {
  return `${getColumnLabel(col)}${row + 1}`;
};

export const evaluateFormula = (
  formula: string,
  data: Record<string, any>
): string => {
  if (!formula.startsWith("=")) return formula;

  try {
    const expression = formula.substring(1);
    const replacedExpression = expression.replace(
      /[A-Z]+[0-9]+/g,
      (cellRef) => {
        const cellValue = data[cellRef]?.value || "0";
        return isNaN(Number(cellValue)) ? `"${cellValue}"` : cellValue;
      }
    );

    // eslint-disable-next-line no-eval
    const result = eval(replacedExpression);
    return result.toString();
  } catch (error) {
    return "#ERROR";
  }
};

export const CELL_DIMENSIONS = {
  rowHeight: 30,
  colWidth: 100,
  maxRows: 9999,
  maxCols: 9999,
} as const;
