import React from "react";
import { MonacoEditor } from "@fusebit/monaco-jsonforms";
import DynamicJsonformsV2 from "./DynamicJsonformsV2";

const budgetly = {
  name: {
    first: "fede",
  },
  customer: {
    type: {
      oportunity: "interested",
    },
  },
};

const salesforce = {
  name: "fede",
  type: {
    oportunity: "interested",
  },
};

const ExampleDynamic = () => {
  const outputFunc = (input: any) => {
    return {};
  };

  return (
    <div>
      <DynamicJsonformsV2
        title="Example"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        baseObject={budgetly}
        mapObject={salesforce}
      />
    </div>
  );
};

export default ExampleDynamic;
