import React, { useEffect, useState } from "react";
import { useJsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, ControlProps, and, uiTypeIs } from "@jsonforms/core";
import dot from "dot-object";
import { MonacoEditor } from "@fusebit/monaco-jsonforms";
import * as sdk from "../utils/sdk";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

const FunctionVanillaRenderer = ({ data }: ControlProps) => {
  const ctx = useJsonForms();
  const [functionValue, setFunctionValue] = useState("");

  useEffect(() => {
    const recipe = sdk.createRecipe(ctx.core.data) || [];
    let objectToReturn = {};
    Object.keys(recipe || []).forEach(key => {
      const mapToKey = dot.pick(key, dot.object(recipe));
      const obj = dot.object({ [mapToKey]: `#input.${key}#` });

      objectToReturn = {
        ...objectToReturn,
        ...obj
      };
    });
    const stringifiedObj = JSON.stringify(objectToReturn);
    const prettyObj = prettier.format(stringifiedObj, {
      parser: "json5",
      plugins: [parserBabel]
    });
    const outputFunction = `(input) => { return ${prettyObj} }`;
    const prettyOutputFunction = prettier
      .format(outputFunction, { parser: "babel", plugins: [parserBabel] })
      .split('#"')
      .join("")
      .split('"#')
      .join("");

    setFunctionValue(prettyOutputFunction);
  }, [ctx.core.data]);

  return (
    <div style={{ width: "1100px", margin: "0 auto" }}>
      <div className="code">
        <MonacoEditor
          isExpandable={true}
          value={functionValue}
          onChange={val => {
            setFunctionValue(val);
            const func = eval(val);
            console.log(
              JSON.stringify(
                func?.(ctx.core.data[ctx.core.data.baseKeys.sourceTableKey])
              )
            );
          }}
        />
      </div>
    </div>
  );
};

const FunctionTester = rankWith(3, and(uiTypeIs("Function")));
const FunctionRenderer = withJsonFormsControlProps(FunctionVanillaRenderer);

const FunctionControl = {
  tester: FunctionTester,
  renderer: FunctionRenderer
};

export { FunctionControl, FunctionTester, FunctionRenderer };

export default FunctionControl;
