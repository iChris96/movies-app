export const isString = (value: any) => typeof value === 'string';

export const isNumeric = (value: any) => {
    return /^\d+$/.test(value);
};
