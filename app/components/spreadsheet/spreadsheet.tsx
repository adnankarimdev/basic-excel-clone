"use client";

import type React from "react";

import {
  CELL_DIMENSIONS,
  evaluateFormula,
  getCellRef,
  getColumnLabel,
} from "@/app/helpers/spreadsheet-helpers";
import { SpreadsheetData } from "@/app/types/spreadsheet-types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormulaLegend } from "./formula-legend";

export default function Spreadsheet() {
  // State for spreadsheet data
  const [data, setData] = useState<SpreadsheetData>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [visibleRows, setVisibleRows] = useState({ start: 0, end: 50 });
  const [visibleCols, setVisibleCols] = useState({ start: 0, end: 20 });
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update handleCellChange to use the helper
  const handleCellChange = (cellRef: string, value: string) => {
    const newData = { ...data };

    if (value.startsWith("=")) {
      newData[cellRef] = {
        formula: value,
        value: evaluateFormula(value, data),
      };

      Object.keys(newData).forEach((ref) => {
        if (newData[ref].formula && newData[ref].formula.includes(cellRef)) {
          newData[ref].value = evaluateFormula(newData[ref].formula, newData);
        }
      });
    } else {
      newData[cellRef] = { value };
    }

    setData(newData);
  };

  // Handle cell click
  const handleCellClick = (cellRef: string) => {
    setActiveCell(cellRef);
    setEditValue(data[cellRef]?.formula || data[cellRef]?.value || "");

    // Focus the input when a cell is clicked
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle input blur
  const handleInputBlur = () => {
    if (activeCell) {
      handleCellChange(activeCell, editValue);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && activeCell) {
      handleCellChange(activeCell, editValue);

      // Move to the next row
      const row = Number.parseInt(activeCell.match(/[0-9]+/)?.[0] || "1") - 1;
      const col = activeCell.match(/[A-Z]+/)?.[0] || "A";
      const nextCellRef = `${col}${row + 2}`;

      setActiveCell(nextCellRef);
      setEditValue(
        data[nextCellRef]?.formula || data[nextCellRef]?.value || ""
      );
    }
  };

  // Update handleScroll to use constants
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollLeft, clientHeight, clientWidth } =
      containerRef.current;
    const { rowHeight, colWidth, maxRows, maxCols } = CELL_DIMENSIONS;

    const startRow = Math.floor(scrollTop / rowHeight);
    const startCol = Math.floor(scrollLeft / colWidth);

    const endRow = Math.min(
      maxRows,
      startRow + Math.ceil(clientHeight / rowHeight)
    );
    const endCol = Math.min(
      maxCols,
      startCol + Math.ceil(clientWidth / colWidth)
    );

    setVisibleRows({ start: startRow, end: endRow });
    setVisibleCols({ start: startCol, end: endCol });
  };

  // Set up scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Generate rows and columns for the visible area
  const rows = [];
  for (let i = visibleRows.start; i <= visibleRows.end; i++) {
    const cells = [];
    for (let j = visibleCols.start; j <= visibleCols.end; j++) {
      const cellRef = getCellRef(i, j);
      const isActive = cellRef === activeCell;

      cells.push(
        <div
          key={cellRef}
          className={`border border-gray-200 w-24 h-8 flex items-center px-2 overflow-hidden ${
            isActive ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => handleCellClick(cellRef)}
          style={{
            position: "absolute",
            left: `${j * 100}px`,
            top: `${i * 30}px`,
          }}
        >
          {data[cellRef]?.value || (
            <span className="text-gray-300">{cellRef}</span>
          )}
        </div>
      );
    }
    rows.push(cells);
  }

  // Generate column headers
  const columnHeaders = [];
  for (let j = visibleCols.start; j <= visibleCols.end; j++) {
    columnHeaders.push(
      <div
        key={`header-${j}`}
        className="border border-gray-300 bg-gray-100 w-24 h-8 flex items-center justify-center font-semibold"
        style={{ position: "absolute", left: `${j * 100}px`, top: "0" }}
      >
        {getColumnLabel(j)}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={editValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
            className="w-64"
            placeholder="Enter value or formula (e.g., =A1+B1)"
          />
          <div className="text-sm text-gray-500">
            {activeCell ? `Active: ${activeCell}` : "No cell selected"}
          </div>
        </div>

        <div
          ref={containerRef}
          className="border border-gray-300 relative overflow-auto"
          style={{ width: "100%", height: "600px" }}
        >
          {/* Column headers */}
          <div
            style={{ position: "sticky", top: 0, height: "30px", zIndex: 5 }}
          >
            <div style={{ marginLeft: "48px" }}>{columnHeaders}</div>
          </div>

          {/* Row headers and Cells container */}
          <div className="flex">
            {/* Cells */}
            <div>{rows.flat()}</div>
          </div>
        </div>

        <Drawer open={isLegendOpen} onOpenChange={setIsLegendOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Formula Help</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Formula Reference</DrawerTitle>
              <DrawerDescription>
                Supported operations and examples for spreadsheet formulas
              </DrawerDescription>
            </DrawerHeader>
            <FormulaLegend />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
