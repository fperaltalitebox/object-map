export const leadJsonSchema = {
  type: "object",
  properties: {
    Title: {
      type: "string",
      enum: ["Salutation", "FirstName", "LastName", "Company", "Base"],
    },
    First: {
      type: "string",
      enum: ["Salutation", "FirstName", "LastName", "Company", "Base"],
    },
    Last: {
      type: "string",
      enum: ["Salutation", "FirstName", "LastName", "Company", "Base"],
    },
    Organization: {
      type: "string",
      enum: ["Salutation", "FirstName", "LastName", "Company", "Base"],
    },
    "Citizenship.Region.state": {
      type: "string",
      enum: ["Salutation", "FirstName", "LastName", "Company", "Base"],
    },
  },
};

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
    Citizenship: {
      Region: {
        state: {
          type: "string",
        },
      },
    },
  },
};

export const sourceToTransformation = {
  Title: "Mr",
  First: "Shehzad",
  Last: "Akbar",
  Organization: "Fusebit",
  Citizenship: {
    Region: {
      state: "Toronto",
    },
  },
};
