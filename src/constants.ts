export const leadJsonSchema = {
  type: "object",
  title: "Salesforce Lead",
  properties: {
    Salutation: {
      type: "string",
      title: "The Lead's salutation",
    },
    FirstName: {
      type: "string",
      title: "The Lead's first name",
    },
    LastName: {
      type: "string",
      title: "The Lead's last name",
    },
    Company: {
      type: "string",
      title: "The Lead's company name",
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
  },
};

export const sourceToTransformation = {
  Title: "Mr",
  First: "Shehzad",
  Last: "Akbar",
  Organization: "Fusebit",
};
