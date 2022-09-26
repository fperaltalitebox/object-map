import React, { useMemo } from "react";
import { useJsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, ControlProps, and, uiTypeIs } from "@jsonforms/core";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@material-ui/core";
import dot from "dot-object";
import * as sdk from "../utils/sdk";

const TransformedTableVanillaRenderer = ({ data }: ControlProps) => {
  const ctx = useJsonForms();

  const tranformedTable: any = useMemo(() => {
    const recipe = sdk.createRecipe(ctx.core.data);

    if (recipe) {
      return dot.transform(dot.dot(recipe), data);
    }

    return [];
  }, [ctx.core.data, data]);

  return (
    <div style={{ width: "1100px", margin: "0 auto" }}>
      {Object.keys(tranformedTable || []).length > 0 && (
        <>
          <h2 style={{ width: "max-content" }}>Transformed Data</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(dot.dot(tranformedTable)).map((val) => (
                    <TableCell style={{ fontWeight: 600 }} key={val}>
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {Object.keys(tranformedTable).map((val) => (
                    <TableCell key={val}>
                      {JSON.stringify(dot.pick(val, tranformedTable))}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

const TransformedTableTester = rankWith(3, and(uiTypeIs("TransformedTable")));
const TransformedTableRenderer = withJsonFormsControlProps(
  TransformedTableVanillaRenderer
);

const TransformedTableControl = {
  tester: TransformedTableTester,
  renderer: TransformedTableRenderer,
};

export {
  TransformedTableControl,
  TransformedTableTester,
  TransformedTableRenderer,
};

export default TransformedTableControl;
