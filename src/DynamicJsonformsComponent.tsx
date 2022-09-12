import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";
import dot from "dot-object";

interface Props {
  object: {
    title: string;
    description: string;
    baseFields: { [key: string]: any };
    integrationKeys: string[];
  };
}

const findValueByPartialKey = (key: string, obj: { [key: string]: any }) => {
  const foundKey = Object.keys(dot.dot(obj)).find((objKey) =>
    objKey.match(key)
  );
  const value = dot.pick(foundKey, obj);
  return value;
};

const getDeepestObject = async (obj: { [key: string]: any }) => {
  const dottedObj = dot.dot(obj);
  return Object.keys(dottedObj).map((key) => {
    if (key.includes(".")) {
      const deepestObjectDottedKey = key
        .split(".")
        .splice(0, key.split(".").length - 1)
        .join(".");

      const deepestObjectValue = dot.pick(deepestObjectDottedKey, obj);
      const deepestObjectKey = key.split(".")[key.split(".").length - 2];
      return { [deepestObjectKey]: deepestObjectValue };
    } else {
      return obj;
    }
  });
};

const DynamicJsonformsComponent = ({ object }: Props) => {
  const [schema, setSchema] = useState();
  const [uischema, setUischema] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const setKeys = async () => {
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

      Object.keys(object.baseFields).forEach(async (key) => {
        const obj: {
          label: string;
          value: string;
          useTransformation?: boolean;
        } = object.baseFields[key];
        const transformationKey = `${key}Transformation`;

        const a = await getDeepestObject(obj);

        const label = findValueByPartialKey("label", obj);

        data[key] = obj.value;

        const schemaProperty = {
          [key]: {
            type: "string",
            title: label,
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

        uischema.elements.push(uiSchemaElements);
      });
      setSchema(schema);
      setUischema(uischema);
      setData(data);
    };

    setKeys();
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
