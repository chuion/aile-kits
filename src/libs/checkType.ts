/**
 * 检测数据类型
 * @param {any} data 待检测的数据
 */
export function checkType(data: any): string {
  const type = Object.prototype.toString.call(data);
  return type.slice(8, -1).toLowerCase();
}
