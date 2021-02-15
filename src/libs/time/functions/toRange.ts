import dayjs, { Dayjs } from 'dayjs';
import options from '../../../globalOptions';

export type ToRangeConfig = {
  start?: string
  end?: string
  nullValue?: any
  formatter?: string
  range?: string
}

const DefaultConfig: ToRangeConfig = {
  start: 'start_time',
  end: 'end_time',
  nullValue: null,
  formatter: 'timestamp',
  range: 'day'
};

export function toRange(target: Date | number, config: ToRangeConfig = {}) {
  if (!dayjs(target).isValid()) {
    throw new Error('AileKit toRange Error: Invalid Date!');
  }

  // 获得预设配置
  const customOption = (options.time || {}).toRange || {};

  // 合并配置
  const mergeConfig = {
    ...DefaultConfig,
    ...customOption,
    ...config
  }

  // 传入空值，返回预设空值
  if (!target) {
    return {
      [mergeConfig.start]: mergeConfig.nullValue,
      [mergeConfig.end]: mergeConfig.nullValue,
    };
  }

  const formatFunc = (time: Dayjs) => {
    if (mergeConfig.formatter === 'timestamp') {
      return time.valueOf();
    }
    return time.format(mergeConfig.formatter);
  };

  return {
    [mergeConfig.start]: formatFunc(dayjs(target).startOf(mergeConfig.range)),
    [mergeConfig.end]: formatFunc(dayjs(target).endOf(mergeConfig.range)),
  };
}
