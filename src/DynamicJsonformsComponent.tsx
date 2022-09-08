import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";

interface Props {
  object: {
    title: string;
    description: string;
    baseFields: { [key: string]: any };
    integrationKeys: string[];
  };
}

const DynamicJsonformsComponent = ({ object }: Props) => {
  const [schema, setSchema] = useState();
  const [uischema, setUischema] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const data: any = {};

    const schema: any = {
      type: "object",
      properties: {},
      required: [],
    };

    const uischema: any = {
      type: "VerticalLayout",
      elements: [],
    };

    Object.keys(object.baseFields).forEach((key) => {
      const obj: { label: string; value: string; useTransformation?: boolean } =
        object.baseFields[key];
      const transformationKey = `${key}Transformation`;

      data[key] = obj.value;

      const schemaProperty = {
        [key]: {
          type: "string",
          title: obj.label,
          useTransformation: !!obj.useTransformation,
        },
        [transformationKey]: {
          type: "string",
          title: obj.useTransformation
            ? "Transformation Function"
            : "Select a key",
          enum: object.integrationKeys,
        },
      };

      const uiSchemaElements = {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: `#/properties/${key}`,
            options: {
              readonly: true,
            },
          },
          {
            type: obj.useTransformation ? "CodeBlock" : "Control",
            scope: `#/properties/${transformationKey}`,
          },
        ],
      };

      schema.properties = { ...schema.properties, ...schemaProperty };
      schema.required.push(key, transformationKey);

      uischema.elements.push(uiSchemaElements);
    });
    setSchema(schema);
    setUischema(uischema);
    setData(data);

    console.log(schema);
    console.log(uischema);
    console.log(data);
  }, [object]);

  return (
    <div>
      {uischema && schema && (
        <>
          <h1>{object.title}</h1>
          <p>{object.description}</p>
          <JsonForms
            data={data}
            schema={schema}
            uischema={uischema}
            cells={materialCells}
            renderers={[...materialRenderers, MonacoEditorControl]}
            onChange={(data) => {
              setData(data.data);
            }}
          />
        </>
      )}
    </div>
  );
};

export default DynamicJsonformsComponent;
