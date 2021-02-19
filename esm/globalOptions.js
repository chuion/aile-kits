const options = new Proxy({}, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
    },
});
export default options;
//# sourceMappingURL=globalOptions.js.map