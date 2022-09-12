const budgetly = {
  name: {
    first: "fede",
  },
};

const salesforce = {
  name: "fede",
  custom: {
    a: "b",
  },
};

const output = {
  "name.first": "name",
};

const outputFunction = (input) => {
  return {
    "name.first": input.name,
  };
};

outputFunction.toString();

// Paso 1: Formulario

// Paso 2: Mapping

// Paso 3: Transform Func
