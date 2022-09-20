import React, { useMemo, useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import {
  rankWith,
  ControlProps,
  JsonSchema,
  and,
  uiTypeIs,
} from "@jsonforms/core";
import Row from "./Row";
import dot from "dot-object";
import * as sdk from "../utils/sdk";

interface Enum {
  value: string;
  label?: string;
}

type CustomProps = {
  items: {
    properties: {
      source: {
        title?: string;
        enum: Enum[];
      };
      target: {
        title?: string;
        enum: Enum[];
      };
    };
  };
};

type JsonSchemaWithCustomProps = JsonSchema & CustomProps;

const DynamicControlVanillaRenderer = ({
  data,
  handleChange,
  path,
  ...props
}: ControlProps) => {
  const [recipe, setRecipe] = useState({});
  const schema = props.schema as JsonSchemaWithCustomProps;
  const rootSchema = props.rootSchema as JsonSchema;

  const handleRowChange = (sourceValue: string, target: Enum) => {
    const i = data.findIndex((row) => row.source.value === sourceValue);
    data[i] = { ...data[i], target };
    handleChange(path, data);

    const dataToTransform = {
      keys: data,
    };
    const recipe = sdk.createRecipe(dataToTransform);
    setRecipe(recipe);
  };

  const baseTable = useMemo(() => {
    return dot.dot(rootSchema.properties.dataToTransform);
  }, [rootSchema]);

  const tranformedTable = useMemo(() => {
    return dot.transform(
      dot.dot(recipe),
      rootSchema.properties.dataToTransform
    );
  }, [recipe, rootSchema]);

  console.log(tranformedTable);

  return (
    <div style={{ width: "1100px", margin: "0 auto" }}>
      <h2 style={{ width: "max-content" }}>Base Table</h2>
      <table>
        <thead>
          <tr>
            {Object.keys(baseTable).map((val) => (
              <th key={val}>{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(baseTable).map((val) => (
              <td key={val}>
                {dot.pick(val, rootSchema.properties.dataToTransform)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {Object.keys(tranformedTable).length > 0 && (
        <>
          <h2 style={{ width: "max-content" }}>Transformed Table</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(dot.dot(tranformedTable)).map((val) => (
                  <td key={val}>{val}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(tranformedTable).map((val) => (
                  <td key={val}>
                    {JSON.stringify(dot.pick(val, tranformedTable))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}
      <div style={{ display: "flex" }}>
        <h2 style={{ marginRight: "auto" }}>
          {schema.items.properties.source.title}
        </h2>
        <h2>{schema.items.properties.target.title}</h2>
      </div>
      {schema.items.properties.source.enum.map((e) => {
        return (
          <Row
            key={e.value}
            source={e}
            targetEnum={schema.items.properties.target.enum}
            onChange={handleRowChange}
          />
        );
      })}
    </div>
  );
};

const DynamicControlTester = rankWith(3, and(uiTypeIs("Dynamic")));
const DynamicControlRenderer = withJsonFormsControlProps(
  DynamicControlVanillaRenderer
);

const DynamicControl = {
  tester: DynamicControlTester,
  renderer: DynamicControlRenderer,
};

export { DynamicControl, DynamicControlTester, DynamicControlRenderer };

export default DynamicControl;
