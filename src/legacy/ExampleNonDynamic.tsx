import React from "react";
import NonDynamicJsonformsComponent from "./NonDynamicJsonformsComponent";

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
      useTransformation: false,
    },
    nameTransformation: {
      type: "string",
      title: "Select a key",
      enum: ["customerName", "customerEmail"],
    },
    email: {
      type: "string",
      title: "Email",
      useTransformation: false,
    },
    emailTransformation: {
      type: "string",
      title: "Select a key",
      enum: ["customerName", "customerEmail"],
    },
  },
  required: ["name", "nameTransformation", "email", "emailTransformation"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
          options: {
            readonly: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/nameTransformation",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/email",
          options: {
            readonly: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/emailTransformation",
        },
      ],
    },
  ],
};

const data = {
  name: "Mike",
  email: "mfuster@litebox.ai",
};

const ExampleNonDynamic = () => {
  return (
    <NonDynamicJsonformsComponent
      title="Non Dynamic Example"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      data={data}
      schema={schema}
      uischema={uischema}
    />
  );
};

export default ExampleNonDynamic;

var target = {
  id: "nr",
  "contact.firstName": "name.first",
  "contact.lastName": "name.last",
  "contact.email": "email",
};
