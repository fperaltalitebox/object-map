import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditor, MonacoEditorControl } from "@fusebit/monaco-jsonforms";
import dot from "dot-object";

interface Props {
  title: string;
  description: string;
  baseObject: { [key: string]: any };
  mapObject: { [key: string]: any };
}

const getNestedKeys = (data: any, keys: any) => {
  if (!(data instanceof Array) && typeof data == "object") {
    Object.keys(data).forEach((key) => {
      keys.push(key);
      const value = data[key];
      if (typeof value === "object" && !(value instanceof Array)) {
        getNestedKeys(value, keys);
      }
    });
  }
  return keys;
};

const DynamicJsonformsV2 = ({
  title,
  description,
  baseObject,
  mapObject,
}: Props) => {
  const [schema, setSchema] = useState();
  const [uischema, setUischema] = useState();
  const [functions, setFunctions] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState("");
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

      const mappingKeys = getNestedKeys(dot.dot(mapObject), []);

      Object.keys(dot.dot(baseObject)).forEach(async (key) => {
        const transformationKey = `${key.replaceAll(".", ":")}:selector`;

        const schemaProperty = {
          [key]: {
            type: "string",
            title: key,
          },
          [transformationKey]: {
            type: "string",
            title: "Select a key",
            enum: mappingKeys,
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
              type: "Control",
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
  }, [baseObject, mapObject]);

  const handleCreateFunction = () => {
    let objectToReturn = {};
    Object.keys(data || []).forEach((key) => {
      const mapToKey = dot.pick(key, data);
      const val = key.replace(":selector", "").replaceAll(":", ".");
      objectToReturn = {
        ...objectToReturn,
        [mapToKey]: `input.${val}`,
      };
    });
    const outputFunction = `const output = () => ${JSON.stringify(
      objectToReturn
    )}`;
    setFunctions([...functions, outputFunction]);
    setSelectedFunction(outputFunction);
  };

  return (
    <div>
      {uischema && schema && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
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
          <div className="btn-wrapper">
            <button className="btn" onClick={handleCreateFunction}>
              Create Function
            </button>
          </div>
          {functions.length > 0 && (
            <div className="flex">
              <select
                className="select"
                name=""
                id=""
                onChange={(val) => {
                  setSelectedFunction(val.target.value);
                }}
              >
                {functions?.map((func, i) => (
                  <option key={i} value={func}>
                    {func}
                  </option>
                ))}
              </select>
              <div className="code">
                <MonacoEditor
                  isExpandable={true}
                  value={selectedFunction}
                  onChange={() => {}}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DynamicJsonformsV2;
