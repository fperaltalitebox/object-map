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
  baseObject: { [key: string]: any };
  mapObject: { [key: string]: any };
  sourceToTransformation: { [key: string]: any };
}

const DynamicJsonformsV4 = ({
  title,
  description,
  baseObject,
  mapObject,
  sourceToTransformation,
}: Props) => {
  const [recipe, setRecipe] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [baseObjectUiSchema, setBaseObjectUiSchema] = useState();
  const [mapObjectSchema, setMapObjectSchema] = useState();

  useEffect(() => {
    const mapObjectEnum: string[] = [];

    Object.keys(dot.dot(mapObject.properties)).forEach(async (key) => {
      const splittedKey = key.split(".");
      const objectKey = splittedKey.slice(0, splittedKey.length - 1).join("/");
      const isObjectKeyInEnum = mapObjectEnum.includes(objectKey);
      if (!isObjectKeyInEnum) {
        mapObjectEnum.push(objectKey);
      }
    });

    const newBaseObjectUiSchema: any = {
      type: "VerticalLayout",
      elements: [],
    };

    const newMapObjectSchema: any = {
      type: "object",
      properties: {},
    };

    Object.keys(dot.dot(baseObject.properties)).forEach(async (key) => {
      const splittedKey = key.split(".");
      const objectKey = splittedKey.slice(0, splittedKey.length - 1).join("/");

      const mapOBjectSchemaProperty = {
        [objectKey]: {
          type: "string",
          enum: mapObjectEnum,
        },
      };

      const uiSchemaElements = {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: `#/properties/${objectKey}`,
            options: {
              readonly: true,
            },
          },
        ],
      };

      newMapObjectSchema.properties = {
        ...newMapObjectSchema.properties,
        ...mapOBjectSchemaProperty,
      };
      newBaseObjectUiSchema.elements.push(uiSchemaElements);
    });

    setBaseObjectUiSchema(newBaseObjectUiSchema);
    setMapObjectSchema(newMapObjectSchema);

    console.log(newMapObjectSchema);
  }, [baseObject, mapObject]);

  return (
    <div>
      {baseObjectUiSchema && mapObjectSchema && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "40px", width: "100%" }}>
              <JsonForms
                data={{}}
                schema={baseObject}
                uischema={baseObjectUiSchema}
                cells={materialCells}
                renderers={[...materialRenderers, MonacoEditorControl]}
              />
            </div>
            <JsonForms
              data={recipe}
              schema={mapObjectSchema}
              cells={materialCells}
              renderers={[...materialRenderers, MonacoEditorControl]}
              onChange={(data) => {
                setRecipe(data.data);
              }}
            />
          </div>
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
