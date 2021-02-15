import * as _kits from './libs';
import { IGlobalOption } from './globalOptions'

const kits: IGlobalOption = { ..._kits };

kits.extend = (plugin: any, option: any) => {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, kits);
    plugin.$i = true;
  }
  return kits;
};

export default kits;

export * from './libs';
