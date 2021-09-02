import { model, Schema, SchemaDefinition, Model } from 'mongoose';

const auditProps: SchemaDefinition = {
    createdAt: { default: new Date() },
    updatedAt: { default: new Date() },
};

// Curryng Patern
const CustomModel = <X>(defaultProps: X) => {
    return <Y>(name: string, props: Y): Model<X | Y> => {
        const schema = new Schema<X | Y>({
            ...defaultProps,
            ...props,
        });

        return model<X | Y>(name, schema);
    };
};

export const withAudit = CustomModel<SchemaDefinition>(auditProps);
