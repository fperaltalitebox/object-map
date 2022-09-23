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

const MappingRendererControlVanillaRenderer = ({
  data,
  handleChange,
  path,
  ...props
}: ControlProps) => {
  const schema = props.schema as JsonSchemaWithCustomProps;

  const handleRowChange = (sourceValue: string, target: Enum) => {
    const i = data.findIndex((row: any) => row.source.value === sourceValue);
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
      {schema.items.properties.source.enum.map((e: any) => {
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

const MappingRendererControlTester = rankWith(3, and(uiTypeIs("Dynamic")));
const MappingRendererControlRenderer = withJsonFormsControlProps(
  MappingRendererControlVanillaRenderer
);

const MappingRendererControl = {
  tester: MappingRendererControlTester,
  renderer: MappingRendererControlRenderer,
};

export {
  MappingRendererControl,
  MappingRendererControlTester,
  MappingRendererControlRenderer,
};

export default MappingRendererControl;
