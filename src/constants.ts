// this schema is read only
export const customerJsonSchema = {
  type: "object",
  title: "Budgetly Customer",
  properties: {
    Title: {
      type: "string",
    },
    First: {
      type: "string",
    },
    Last: {
      type: "string",
    },
    Organization: {
      type: "string",
    },
  },
};

// this schema gets mapped
export const leadJsonSchema = {
  type: "object",
  title: "Salesforce Lead",
  properties: {
    Salutation: {
      type: "string",
    },
    FirstName: {
      type: "string",
    },
    LastName: {
      type: "string",
    },
    Company: {
      type: "string",
    },
  },
};


const _schema = {
  type: "object",
  properties: {
    keys: {
      type: "array",
      items: {
        type: "object",
        properties: {
          source: {
            type: "string",
            enum: ["first.name", "last.name"]
          },
          target: {
            type: "string",
            enum: ["firstName", "lastName"]
          }
        }
      }
    }
  }
};


export const magicFunction = (schema1: any, schema2: any) => {
  return {
    type: "object",
    properties: {
      keys: {
        type: "array",
        items: {
          type: "object",
          properties: {
            left: {
              type: "string",
              enum: Object.keys(schema1.properties)
            },
            right: {
              type: "string",
              enum: Object.keys(schema2.properties)
            },
          },
        },
      }
    }
  }
}

magicFunction(customerJsonSchema, leadJsonSchema)









// this is some sample data that will get transformed
export const sourceToTransformation = {
  Title: "Mr",
  First: "Shehzad",
  Last: "Akbar",
  Organization: "Fusebit",
};
