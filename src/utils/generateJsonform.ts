import dot from "dot-object";

interface Schema {
  [key: string]: any;
  properties: {
    [key: string]: any;
  };
}

export const generateJsonform = (
  readOnlySchema: Schema,
  mappingSchema: Schema
) => {
  const mapObjectEnum: string[] = [];

  const uischema: any = {
    type: "VerticalLayout",
    elements: [],
  };

  const schema: any = {
    type: "object",
    properties: {},
  };

  // First we create the enum
  Object.keys(dot.dot(mappingSchema.properties)).forEach((key) => {
    const splittedKey = key.split(".");
    const objectKey = splittedKey.slice(0, splittedKey.length - 1).join(".");
    const isObjectKeyInEnum = mapObjectEnum.includes(objectKey);
    if (!isObjectKeyInEnum) {
      mapObjectEnum.push(objectKey);
    }
  });

  // Then we create the schema and uischema usign the enum
  Object.keys(dot.dot(readOnlySchema.properties)).forEach((key) => {
    const splittedKey = key.split(".");
    const propKey = splittedKey.slice(0, splittedKey.length - 1).join("/");

    const schemaProperties = {
      [`${propKey}ReadOnly`]: {
        type: "string",
        title: propKey.replaceAll("/", " "),
      },
      [propKey]: {
        type: "string",
        enum: mapObjectEnum,
      },
    };

    const uiSchemaElements = {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: `#/properties/${propKey}ReadOnly`,
          options: {
            readonly: true,
          },
        },
        {
          type: "Control",
          scope: `#/properties/${propKey}`,
        },
      ],
    };

    schema.properties = {
      ...schema.properties,
      ...schemaProperties,
    };
    uischema.elements.push(uiSchemaElements);
  });

  return { schema, uischema };
};
