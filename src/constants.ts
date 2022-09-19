// this schema is the source
export const customerJsonSchema = {
  type: "object",
  title: "Budgetly Customer",
  properties: {
    Title: {
      type: "string",
      label: "Budgetly Title",
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
              label: "Budgetly Nested Property",
            },
          },
        },
      },
    },
  },
};

// this schema is the target
export const leadJsonSchema = {
  type: "object",
  title: "Salesforce Lead",
  properties: {
    Salutation: {
      type: "string",
      label: "Salesforce Salutation",
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
                    label: "Salesforce Nested Label",
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
