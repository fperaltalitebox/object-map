import dot from "dot-object";

const getKeyWithoutLastElement = (key: string) => {
  const splittedKey = key.split(".");
  const keyWithoutLastElement = splittedKey
    .slice(0, splittedKey.length - 1)
    .join(".");
  return keyWithoutLastElement;
};

const parseKey = (key: string) => {
  const keyWithoutProperties = key.split("properties.").join("");
  const objectKey = getKeyWithoutLastElement(keyWithoutProperties);
  return objectKey;
};

const generateEnum = (schema: any) => {
  const schemaEnum: any = [];

  Object.keys(dot.dot(schema.properties)).forEach(key => {
    const value = parseKey(key);
    const baseKey = getKeyWithoutLastElement(key);
    const objectProperties = dot.pick(baseKey, schema.properties);
    const baseObject = { value, ...objectProperties };
    const isEnumIncluded = schemaEnum.find((val: any) => val.value === value);
    if (!isEnumIncluded) {
      schemaEnum.push(baseObject);
    }
  });

  return schemaEnum;
};

export const getKeyByUiSchemaType = (uischema, type: string) => {
  let objectKey = null;

  Object.keys(dot.dot(uischema)).forEach(element => {
    if (element.includes("type") && dot.pick(element, uischema) === type) {
      const scopePicker = element.replace("type", "scope");
      const scope = dot.pick(scopePicker, uischema);
      const splittedScope = scope.split("/");
      const key = splittedScope[splittedScope.length - 1];
      objectKey = key;
    }
  });

  return objectKey;
};

export const createSchema = ({
  source,
  target,
  uischema,
  dataToTransform
}: {
  source: any;
  target: any;
  uischema: any;
  dataToTransform: any;
}) => {
  const dynamicObjectKey = getKeyByUiSchemaType(uischema, "Dynamic");
  const sourceTableKey = getKeyByUiSchemaType(uischema, "SourceTable");
  const TransformedTableKey = getKeyByUiSchemaType(
    uischema,
    "TransformedTable"
  );
  const sourceEnum = [
    ...generateEnum(source),
  ];
  const targetEnum = generateEnum(target);

  const schema = {
    type: "object",
    properties: {
      [dynamicObjectKey]: {
        type: "array",
        items: {
          type: "object",
          required: ["target"],
          properties: {
            source: {
              type: "object",
              title: source?.title,
              enum: sourceEnum
            },
            target: {
              type: "object",
              title: target?.title,
              enum: targetEnum
            }
          }
        }
      },
      ...(sourceTableKey && { [sourceTableKey]: { type: "object" } }),
      ...(TransformedTableKey && { [TransformedTableKey]: { type: "object" } })
    }
  };

  return {
    schema: schema,
    data: {
      [dynamicObjectKey]: sourceEnum.map(source => ({ source })),
      [sourceTableKey]: dataToTransform,
      [TransformedTableKey]: dataToTransform,
      baseKeys: {
        dynamicObjectKey,
        sourceTableKey,
        TransformedTableKey
      }
    }
  };
};

export const createRecipe = (data: any) => {
  if (!data.baseKeys.dynamicObjectKey) {
    return;
  }

  return data[data.baseKeys.dynamicObjectKey].reduce(
    //@ts-ignore
    (acc, { source, target }) => {
      if (!target?.value) {
        return acc;
      }

      acc[source.value] = target.value;
      return acc;
    },
    {}
  );
};

export const transformData = (data: any, sourceData: any) => {
  const recipe = createRecipe(data);
  const transformedData = dot.transform(dot.dot(recipe), sourceData);

  return transformedData;
};
