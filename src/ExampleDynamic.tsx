import React from "react";
import {
  leadJsonSchema,
  customerJsonSchema,
  sourceToTransformation,
} from "./constants";
import DynamicJsonformsV4 from "./DynamicJsonformsV4";

const ExampleDynamic = () => {
  return (
    <div>
      <DynamicJsonformsV4
        title="Example"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        readOnlyObject={customerJsonSchema}
        mapObject={leadJsonSchema}
        sourceToTransformation={sourceToTransformation}
      />
    </div>
  );
};

export default ExampleDynamic;
