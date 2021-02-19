import { IGlobalOption } from '../globalOptions';
import { FormatTimeConfig, ToRangeConfig } from '../libs/time';
declare type TimePluginConfig = {
    formatTime?: FormatTimeConfig;
    toRange?: ToRangeConfig;
};
declare const _default: (option: TimePluginConfig, kits: IGlobalOption) => void;
export default _default;
