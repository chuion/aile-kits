import * as timeFunctions from '../libs/time';
export * from '../libs/time';
import options, { IGlobalOption } from '../globalOptions';
import { FormatTimeConfig, ToRangeConfig } from '../libs/time';

type TimePluginConfig = {
  formatTime?: FormatTimeConfig
  toRange?: ToRangeConfig
}

export default (option: TimePluginConfig, kits: IGlobalOption) => {
  kits.time = { ...timeFunctions };
  options.time = option || {};
};
