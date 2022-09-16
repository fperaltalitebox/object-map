import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { MonacoEditorControl } from "@fusebit/monaco-jsonforms";

interface Props {
  title: string;
  subtitle: string;
  schema: any;
  uischema: any;
  data: any;
}

const NonDynamicJsonformsComponent = ({
  title,
  subtitle,
  schema,
  uischema,
  data,
}: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <JsonForms
        data={data}
        schema={schema}
        uischema={uischema}
        cells={materialCells}
        renderers={[...materialRenderers, MonacoEditorControl]}
      />
    </>
  );
};

export default NonDynamicJsonformsComponent;
