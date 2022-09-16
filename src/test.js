const source = {
  name: {
    first: "fede",
  },
};

const target = {
  name: "fede",
  custom: {
    a: "b",
  },
};

const target = {
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
