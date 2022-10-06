// source
export const customerJsonSchema = {
  type: "object",
  title: "Budgetly Customer",
  properties: {
    Title: {
      type: "string",
      // label: "Budgetly Title",
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
              // label: "Budgetly Nested Property",
            },
          },
        },
      },
    },
  },
};

// target
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
  },
};

// source data
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
