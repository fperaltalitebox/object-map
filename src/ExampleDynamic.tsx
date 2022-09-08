import React from "react";
import DynamicJsonformsComponent from "./DynamicJsonformsComponent";
import { nestedObject } from "./constants";

const initObject: any = {
  title: "Dynamic Example",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  baseFields: {
    name: {
      label: "Name",
      value: "Mike",
    },
    email: {
      label: "Email",
      value: "mfuster@litebox.ai",
    },
  },
  integrationKeys: ["customerName", "customerEmail"],
};

const ExampleDynamic = () => {
  return <DynamicJsonformsComponent object={initObject} />;
};

export default ExampleDynamic;
