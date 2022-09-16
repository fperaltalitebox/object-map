import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";
import dot from "dot-object";

interface Props {
  title: string;
  description: string;
  schema: any;
  uischema: any;
  sourceToTransformation: any;
  onSubmit?: (data: any) => void;
  data?: any;
}

const DynamicJsonformsV4 = ({
  title,
  description,
  uischema,
  data,
  schema,
  sourceToTransformation
}: Props) => {
  const [recipe, setRecipe] = useState();

  return (
    <div>
      {schema && uischema && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
          <JsonForms
            data={data}
            schema={schema}
            uischema={uischema}
            cells={materialCells}
            renderers={[...materialRenderers, MonacoEditorControl]}
            onChange={data => {
              if ((data?.errors || []).length > 0) {
                return;
              }

              const test = data.data.mappingKey.reduce(
                //@ts-ignore
                (acc, { budgetly, salesforce }) => {
                  acc[budgetly] = salesforce;
                  return acc;
                },
                {}
              );

              setRecipe(test);
            }}
          />
          {recipe && (
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
