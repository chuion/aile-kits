import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import options from '../../../globalOptions';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export type FormatTimeConfig = {
  template?: string
}

const DefaultConfig: FormatTimeConfig = {
  template: 'YYYY-MM-DD HH:mm:ss'
};


/**
 * 格式化时间
 * @param {number | string} time 时间
 * @param {?string} format 期望的格式化格式 默认YYYY-MM-DD HH:mm:ss 可通过“fmt:Ys”形式表示YYYY-MM-DD HH:mm:ss，以此类推“fmt:Ms”，“fmt:Dm”等
 * @param {?string} timeFormat time本身的格式
 */
export function formatTime(time?: number | string, format: string = '', timeFormat?: string, template?:string): Error | string {

  time = time || Date.now()

   // 非法日期报错
  if (timeFormat && !dayjs(time, timeFormat).isValid()) {
    throw new Error('AileKit formatTime Error: Invalid Date!');
  }
  if (!timeFormat && !dayjs(+time).isValid()) {
    throw new Error('AileKit formatTime Error: Invalid Date!');
  }

  // 获得预设配置
  const customOption = (options.time || {}).formatTime || {};

  // 合并配置
  const mergeConfig = {
    ...DefaultConfig,
    ...customOption
  };

  // 检测是否传入模板
  if (template) {
    mergeConfig.template = template;
  }

  let realFormat = format || mergeConfig.template;

  if (format.startsWith('fmt:')) {
    const range = format.replace('fmt:', '').split('');
    const from = mergeConfig.template.indexOf(range[0]) || 0;
    const to = mergeConfig.template.lastIndexOf(range[1]) + 1 || mergeConfig.template.length;
    realFormat = mergeConfig.template.substring(from, to);
  }

  return dayjs(time, timeFormat).format(realFormat);
}
