import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";
import dot from "dot-object";

interface Props {
  title: string;
  description: string;
  readOnlyObject: { [key: string]: any };
  mapObject: { [key: string]: any };
  sourceToTransformation: { [key: string]: any };
}

const DynamicJsonformsV4 = ({
  title,
  description,
  readOnlyObject,
  mapObject,
  sourceToTransformation,
}: Props) => {
  const [recipe, setRecipe] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [uischema, setUischema] = useState();
  const [schema, setSchema] = useState();

  useEffect(() => {
    const mapObjectEnum: string[] = [];

    Object.keys(dot.dot(mapObject.properties)).forEach(async (key) => {
      const splittedKey = key.split(".");
      const objectKey = splittedKey.slice(0, splittedKey.length - 1).join(".");
      const isObjectKeyInEnum = mapObjectEnum.includes(objectKey);
      if (!isObjectKeyInEnum) {
        mapObjectEnum.push(objectKey);
      }
    });

    const newUiSchema: any = {
      type: "VerticalLayout",
      elements: [],
    };

    const newSchema: any = {
      type: "object",
      properties: {},
    };

    Object.keys(dot.dot(readOnlyObject.properties)).forEach(async (key) => {
      const splittedKey = key.split(".");
      const propKey = splittedKey.slice(0, splittedKey.length - 1).join("/");

      const schemaProperties = {
        [`${propKey}ReadOnly`]: {
          type: "string",
          title: propKey.replaceAll("/", " "),
        },
        [propKey]: {
          type: "string",
          enum: mapObjectEnum,
        },
      };

      const uiSchemaElements = {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: `#/properties/${propKey}ReadOnly`,
            options: {
              readonly: true,
            },
          },
          {
            type: "Control",
            scope: `#/properties/${propKey}`,
          },
        ],
      };

      newSchema.properties = {
        ...newSchema.properties,
        ...schemaProperties,
      };
      newUiSchema.elements.push(uiSchemaElements);
    });

    setSchema(newSchema);
    setUischema(newUiSchema);
  }, [readOnlyObject, mapObject]);

  return (
    <div>
      {schema && uischema && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
          <JsonForms
            data={recipe}
            schema={schema}
            uischema={uischema}
            cells={materialCells}
            renderers={[...materialRenderers, MonacoEditorControl]}
            onChange={(data) => {
              setRecipe(data.data);
            }}
          />
          <div className="btn-wrapper">
            <button
              className="btn"
              onClick={() => {
                setHasSubmitted(true);
              }}
            >
              Submit
            </button>
          </div>
          {hasSubmitted && (
            <>
              <h4>
                This is the payload that will be saved in the install data
              </h4>
              <div style={{ marginBottom: "40px" }}>
                Recipe: {JSON.stringify(dot.dot(recipe), null, "\t")}
              </div>
              <h4>This is the source data</h4>
              <div style={{ marginBottom: "40px" }}>
                Source: {JSON.stringify(sourceToTransformation, null, "\t")}
              </div>
              <h4>
                This is the result of using the recipe on the source data with
                dot-object
              </h4>
              <div>
                Transformed Data:{" "}
                {JSON.stringify(
                  dot.transform(dot.dot(recipe), sourceToTransformation),
                  null,
                  "\t"
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DynamicJsonformsV4;
