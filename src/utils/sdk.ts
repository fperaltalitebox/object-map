import dot from "dot-object";

const parseKey = (key: string) => {
  const keyWithoutProperties = key.replaceAll("properties.", "");
  const splittedKey = keyWithoutProperties.split(".");
  const objectKey = splittedKey.slice(0, splittedKey.length - 1).join(".");
  return objectKey;
};

const generateEnum = (schema) => {
  const schemaEnum = [];

  Object.keys(dot.dot(schema.properties)).forEach((key) => {
    const objectKey = parseKey(key);
    if (!schemaEnum.includes(objectKey)) {
      schemaEnum.push(objectKey);
    }
  });

  return schemaEnum;
};

export const createSchema = ({ source, target }) => {
  const sourceEnum = generateEnum(source);
  const targetEnum = generateEnum(target);

  const schema = {
    type: "object",
    properties: {
      keys: {
        type: "array",
        items: {
          type: "object",
          required: ["target", "source"],
          properties: {
            source: {
              type: "string",
              enum: sourceEnum,
            },
            target: {
              type: "string",
              enum: targetEnum,
            },
          },
        },
      },
    },
  };

  return {
    schema: schema,
    keys: sourceEnum.map((val) => ({ source: val })),
  };
};

export const createRecipe = (data: any) => {
  return data.keys.reduce(
    //@ts-ignore
    (acc, { source, target }) => {
      acc[source] = target;
      return acc;
    },
    {}
  );
};
