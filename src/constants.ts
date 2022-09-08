export const nestedObject = {
  configuration: {
    input: {
      contact: {
        firstName: {
          label: "First Name",
          required: true,
        },
        lastName: {
          label: "Last Name",
          required: true,
        },
        email: {
          label: "Email Address",
          required: true,
        },
        additionalContact: {
          label: {
            phone: {
              label: "Phone Number",
            },
            homeAddress: {
              label: "Home Address",
            },
          },
          required: false,
        },
      },
    },
  },
  mapping: {
    salesforceObjects: ["name", "contact1", "contact2", "contact3", "contact4"],
  },
};
