import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";
import { MappingRendererControl } from "./customRenderer/customRenderer";
import SourceTableControl from "./SourceTable/SourceTable";
import TransformedTableControl from "./TransformedTable/TransformedTable";

interface Props {
  schema: any;
  uischema: any;
  onSubmit?: (data: any) => void;
  data?: any;
}

const DynamicJsonformsV4 = ({ uischema, data, schema, onSubmit }: Props) => {
  const [submitData, setSubmitData] = useState<any>();

  return (
    <div>
      {schema && uischema && (
        <>
          <JsonForms
            data={submitData || data}
            schema={schema}
            uischema={uischema}
            cells={materialCells}
            renderers={[
              ...materialRenderers,
              MonacoEditorControl,
              MappingRendererControl,
              SourceTableControl,
              TransformedTableControl,
            ]}
            onChange={(data) => {
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
        </>
      )}
    </div>
  );
};

export default DynamicJsonformsV4;
