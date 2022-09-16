import React from "react";
import {
  leadJsonSchema,
  customerJsonSchema,
  sourceToTransformation
} from "./constants";
import DynamicJsonformsV4 from "./DynamicJsonformsV4";
import { generateJsonform } from "./utils/generateJsonform";
import * as sdk from "./utils/sdk";

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/mappingKey"
    }
  ]
};

const { mappingKey, schema } = sdk.createSchema({
  source: customerJsonSchema,
  target: leadJsonSchema
});

const ExampleDynamic = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <DynamicJsonformsV4
        onSubmit={handleSubmit}
        data={{ mappingKey }}
        uischema={uischema}
        title="Example"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        schema={schema}
        sourceToTransformation={sourceToTransformation}
      />
    </div>
  );
};

export default ExampleDynamic;
