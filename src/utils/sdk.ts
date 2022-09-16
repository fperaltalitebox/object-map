export const createSchema = ({ source, target }) => {
    console.log(source.properties)
    const schema = {
        type: "object",
        properties: {
            keys: {
                type: "array",
                items: {
                    type: "object",
                    required: ["target", "source"],
                    properties: {
                        source: {
                            type: "string",
                            enum: Object.keys(source.properties),
                        },
                        target: {
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
        keys: Object.keys(source.properties).map(
            key => ({
                source: key
            })
        )
    }
}

export const createRecipe = (data: any) => {
    return data.keys.reduce(
        //@ts-ignore
        (acc, { source, target }) => {
            acc[source] = target;
            return acc;
        },
        {}
    );
}

