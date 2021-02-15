import { checkType } from "./checkType";
export function isEmpty(data) {
    const dataType = checkType(data);
    switch (dataType) {
        case "array":
            return !data.length;
        case 'object':
            return !Object.keys(data).length;
        case 'map':
        case 'set':
            return !data.size;
        case 'boolean':
        case 'number':
        case 'symbol':
        case 'function':
            return false;
        default:
            return !data;
    }
}
