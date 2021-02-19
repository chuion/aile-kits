export function checkType(data) {
    const type = Object.prototype.toString.call(data);
    return type.slice(8, -1).toLowerCase();
}
//# sourceMappingURL=checkType.js.map