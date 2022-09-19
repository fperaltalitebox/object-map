import React from "react";
import { useState } from "react";
import {
  leadJsonSchema,
  customerJsonSchema,
  sourceToTransformation,
} from "./constants";
import DynamicJsonformsV4 from "./DynamicJsonformsV4";
import * as sdk from "./utils/sdk";
import dot from "dot-object";
import { MonacoEditor } from "@fusebit/monaco-jsonforms";

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Dynamic",
      scope: "#/properties/keys",
    },
  ],
};

const ExampleDynamic = () => {
  const [recipe, setRecipe] = useState();

  const handleSubmit = (data: any) => {
    const recipe = sdk.createRecipe(data);
    setRecipe(recipe);
  };

  const { data, schema } = sdk.createSchema({
    source: customerJsonSchema,
    target: leadJsonSchema,
  });

  return (
    <div style={{ paddingBottom: "100px" }}>
      <DynamicJsonformsV4
        onSubmit={handleSubmit}
        data={data}
        uischema={uischema}
        schema={schema}
      />
      {recipe && (
        <>
          <h4>This is the schema</h4>
          <div style={{ marginBottom: "40px" }}>
            <MonacoEditor
              value={JSON.stringify(schema, null, "\t")}
              onChange={() => {}}
              language="json"
            />
          </div>
          <h4>This is the source data</h4>
          <div style={{ marginBottom: "40px" }}>
            <MonacoEditor
              value={JSON.stringify(sourceToTransformation, null, "\t")}
              onChange={() => {}}
              isExpandable
              language="json"
            />
          </div>
          <h4>This is the submitData:</h4>
          <div style={{ marginBottom: "40px" }}>
            <MonacoEditor
              value={JSON.stringify(dot.dot(recipe), null, "\t")}
              onChange={() => {}}
              isExpandable
              language="json"
            />
          </div>
          <h4>This is the transformed data</h4>
          <div>
            <MonacoEditor
              value={JSON.stringify(
                dot.transform(dot.dot(recipe), sourceToTransformation),
                null,
                "\t"
              )}
              onChange={() => {}}
              isExpandable
              language="json"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExampleDynamic;
