import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import {
  rankWith,
  ControlProps,
  JsonSchema,
  and,
  uiTypeIs,
} from "@jsonforms/core";
import Row from "./Row";

interface Enum {
  value: string;
  label?: string;
}

type CustomProps = {
  isExpandable: boolean;
  language: string;
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
  const schema = props.schema as JsonSchemaWithCustomProps;

  const handleRowChange = (sourceValue: string, target: Enum) => {
    const i = data.findIndex((row) => row.source.value === sourceValue);
    data[i] = { ...data[i], target };
    handleChange(path, data);
  };

  return (
    <div style={{ width: "1100px", margin: "0 auto" }}>
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
