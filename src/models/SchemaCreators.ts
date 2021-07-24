import { model, Schema, SchemaDefinition } from 'mongoose';

const auditProps: SchemaDefinition = {};

// Curryng Patern
const Model = (defaultProps: SchemaDefinition) => {
    return (name: string, props: SchemaDefinition) => {
        const schema = new Schema({
            ...defaultProps,
            ...props,
        });

        return model(name, schema);
    };
};

export const withAudit = Model(auditProps);
