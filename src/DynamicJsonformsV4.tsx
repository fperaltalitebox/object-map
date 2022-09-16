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
  sourceToTransformation,
  onSubmit
}: Props) => {
  const [submitData, setSubmitData] = useState();

  return (
    <div>
      {schema && uischema && (
        <>
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

              setSubmitData(data.data);
            }}
          />
          <button
            className="btn"
            onClick={() => {
              if (submitData) {
                onSubmit?.(submitData);
              }
            }}
          >
            Create Recipe
          </button>
          {submitData && (
            <>
              <h4>This is the source data</h4>
              <div style={{ marginBottom: "40px" }}>
                {JSON.stringify(sourceToTransformation, null, "\t")}
              </div>
              <h4>This is the submitData:</h4>
              <div style={{ marginBottom: "40px" }}>
                {JSON.stringify(dot.dot(submitData), null, "\t")}
              </div>
              <h4>This is the transformed data</h4>
              <div>
                {JSON.stringify(
                  dot.transform(dot.dot(submitData), sourceToTransformation),
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
