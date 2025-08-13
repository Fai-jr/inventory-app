import schema from "./json-schema.json"

interface JSONSchema {
    type: string;
    properties: Record<string, any>;
    required?: string[];
    [key: string]: any;
}

interface GeneratedSchema {
    $schema: string;
    definitions: Record<string, JSONSchema>;
}

const typedSchema = schema as GeneratedSchema;

function replaceReferences(obj: any): any{
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(replaceReferences);
    }

    const newObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
        if (key === "$ref" && typeof value === "string") {
            newObj[key] = value.replace("#/definitions/", "#/components/schemas/");
        } else{
            newObj[key] = replaceReferences(value);
        }
    }
    return newObj;
}

export const allSchemas = replaceReferences(typedSchema.definitions);