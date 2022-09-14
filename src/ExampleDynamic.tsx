import React from "react";
import DynamicJsonformsV3 from "./DynamicJsonformsV3";
import {
  leadJsonSchema,
  customerJsonSchema,
  sourceToTransformation,
} from "./constants";

const ExampleDynamic = () => {
  return (
    <div>
      <DynamicJsonformsV3
        title="Example"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        baseObject={customerJsonSchema}
        mapObject={leadJsonSchema}
        sourceToTransformation={sourceToTransformation}
      />
    </div>
  );
};

export default ExampleDynamic;
