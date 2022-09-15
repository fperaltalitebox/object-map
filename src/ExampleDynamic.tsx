import React from "react";
import {
  leadJsonSchema,
  customerJsonSchema,
  sourceToTransformation,
} from "./constants";
import DynamicJsonformsV4 from "./DynamicJsonformsV4";
import { generateJsonform } from "./generateJsonform";

const ExampleDynamic = () => {
  const { schema, uischema } = generateJsonform(
    customerJsonSchema,
    leadJsonSchema
  );

  return (
    <div>
      <DynamicJsonformsV4
        title="Example"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        schema={schema}
        uischema={uischema}
        sourceToTransformation={sourceToTransformation}
      />
    </div>
  );
};

export default ExampleDynamic;
