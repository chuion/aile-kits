import * as _kits from './libs';
const kits = Object.assign({}, _kits);
kits.extend = (plugin, option) => {
    if (!plugin.$i) {
        plugin(option, kits);
        plugin.$i = true;
    }
    return kits;
};
export default kits;
export * from './libs';
//# sourceMappingURL=index.js.map