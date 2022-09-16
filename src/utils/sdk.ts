export const createSchema = ({ source, target }) => {
    console.log(source.properties)
    const schema = {
        type: "object",
        properties: {
            mappingKey: {
                type: "array",
                items: {
                    type: "object",
                    required: ["salesforce", "budgetly"],
                    properties: {
                        budgetly: {
                            type: "string",
                            enum: Object.keys(source.properties),
                        },
                        salesforce: {
                            type: "string",
                            enum: Object.keys(target.properties)
                        }
                    }
                }
            }
        }
    }

    return {
        schema: schema,
        mappingKey: Object.keys(source.properties).map(
            key => ({
                budgetly: key
            })
        )
    }
}

export const createRecipe = ({ jsonFormData, key }) => {
    return jsonFormData?.data?.[key].reduce(
        (acc, { source, target }) => {
            acc[source] = target;
            return acc;
        },
        {}
    )
}
