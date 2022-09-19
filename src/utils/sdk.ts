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
    const value = parseKey(key);
    const splittedKey = key.split(".");
    const baseKey = splittedKey.slice(0, splittedKey.length - 1).join(".");
    const objectProperties = dot.pick(baseKey, schema.properties);
    const baseObject = { value, ...objectProperties };
    const isEnumIncluded = schemaEnum.find((val) => val.value === value);
    if (!isEnumIncluded) {
      schemaEnum.push(baseObject);
    }
  });

  return schemaEnum;
};

export const createSchema = ({
  source,
  target,
}: {
  source: any;
  target: any;
}) => {
  const sourceEnum = generateEnum(source);
  const targetEnum = generateEnum(target);

  const schema = {
    type: "object",
    properties: {
      keys: {
        type: "array",
        items: {
          type: "object",
          required: ["target"],
          properties: {
            source: {
              type: "object",
              title: source?.title,
              enum: sourceEnum,
            },
            target: {
              type: "object",
              title: target?.title,
              enum: targetEnum,
            },
          },
        },
      },
    },
  };

  return {
    schema: schema,
    data: { keys: sourceEnum.map((val) => ({ source: val })) },
  };
};

export const createRecipe = (data: any) => {
  console.log("data", data);

  return data.keys.reduce(
    //@ts-ignore
    (acc, { source, target }) => {
      acc[source.value] = target.value;
      return acc;
    },
    {}
  );
};
