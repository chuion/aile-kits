import * as timeFunctions from '../libs/time';
import options from '../globalOptions';
export default (option, kits) => {
    kits.time = Object.assign({}, timeFunctions);
    options.time = option || {};
};
//# sourceMappingURL=time.js.map