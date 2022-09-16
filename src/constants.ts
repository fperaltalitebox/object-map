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
    Nested: {
      Object: {
        Is: {
          properties: {
            here: {
              type: "string",
            },
          },
        },
      },
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
    Nested: {
      Keys: {
        properties: {
          oneNestedKey: {
            type: "string",
          },
          anotherNestedKey: {
            type: "object",
            NestedInsideNestedKey: {
              moreNesting: {
                properties: {
                  superNestedFirstKey: {
                    type: "string",
                  },
                  superNestedSecondKey: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// this is some sample data that will get transformed
export const sourceToTransformation = {
  Title: "Mr",
  First: "Shehzad",
  Last: "Akbar",
  Organization: "Fusebit",
  Nested: {
    Object: {
      Is: {
        here: "Nesting Objects Worked!",
      },
    },
  },
};
