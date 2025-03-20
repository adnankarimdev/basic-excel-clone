import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FormulaLegend() {
  return (
    <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Basic Arithmetic Operations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Addition</TableCell>
                <TableCell>+</TableCell>
                <TableCell>=A1+B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subtraction</TableCell>
                <TableCell>-</TableCell>
                <TableCell>=A1-B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Multiplication</TableCell>
                <TableCell>*</TableCell>
                <TableCell>=A1*B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Division</TableCell>
                <TableCell>/</TableCell>
                <TableCell>=A1/B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Modulus (remainder)</TableCell>
                <TableCell>%</TableCell>
                <TableCell>=A1%B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Exponentiation</TableCell>
                <TableCell>**</TableCell>
                <TableCell>=A1**B1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium">Comparison Operations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Equal to</TableCell>
                <TableCell>==</TableCell>
                <TableCell>=A1==B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Not equal to</TableCell>
                <TableCell>!=</TableCell>
                <TableCell>=A1!=B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Greater than</TableCell>
                <TableCell>{">"}</TableCell>
                <TableCell>=A1&gt;B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less than</TableCell>
                <TableCell>{"<"}</TableCell>
                <TableCell>=A1&lt;B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Greater than or equal to</TableCell>
                <TableCell>{">="}</TableCell>
                <TableCell>=A1&gt;=B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less than or equal to</TableCell>
                <TableCell>{"<="}</TableCell>
                <TableCell>=A1&lt;=B1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium">Logical Operations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>AND</TableCell>
                <TableCell>&&</TableCell>
                <TableCell>=A1&&B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>OR</TableCell>
                <TableCell>||</TableCell>
                <TableCell>=A1||B1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NOT</TableCell>
                <TableCell>!</TableCell>
                <TableCell>=!A1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium">Complex Expressions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Parentheses for order of operations</TableCell>
                <TableCell>=(A1+B1)*C1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Multiple operations</TableCell>
                <TableCell>=A1+(B1*C1)/D1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ternary operator (if-then-else)</TableCell>
                <TableCell>=(A1&gt;10)?(B1*2):C1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium">JavaScript Math Functions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Function</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Math.sqrt()</TableCell>
                <TableCell>Square root</TableCell>
                <TableCell>=Math.sqrt(A1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Math.abs()</TableCell>
                <TableCell>Absolute value</TableCell>
                <TableCell>=Math.abs(A1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Math.round()</TableCell>
                <TableCell>Round to nearest integer</TableCell>
                <TableCell>=Math.round(A1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Math.floor()</TableCell>
                <TableCell>Round down</TableCell>
                <TableCell>=Math.floor(A1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Math.ceil()</TableCell>
                <TableCell>Round up</TableCell>
                <TableCell>=Math.ceil(A1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Math.sin(), Math.cos(), etc.</TableCell>
                <TableCell>Trigonometric functions</TableCell>
                <TableCell>=Math.sin(A1)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
