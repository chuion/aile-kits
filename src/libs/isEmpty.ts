import { checkType } from "./checkType";

/**
 * 检测传入的数据是否为空值
 * 空值包括：'' / [] / {} / Map{0} / Set{0} / null / undefined
 * @param data 待检测的数据
 */
export function isEmpty(data: any) {
  const dataType = checkType(data);
  switch (dataType) {
    case "array":
      return !data.length;
    case 'object':
      return !Object.keys(data).length;
    case 'map':
    case 'set':
      return !data.size
    case 'boolean':
    case 'number':
    case 'symbol':
    case 'function':
      return false;
    default:
      return !data
  }
}
