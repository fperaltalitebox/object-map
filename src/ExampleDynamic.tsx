import React from "react";
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
