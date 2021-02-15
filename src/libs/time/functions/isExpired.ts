import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
dayjs.extend(toArray);

export enum IgnoreType {
  year = 'year',
  month = 'month',
  date = 'date',
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  millsecond = 'millisecond',
}

const IgnoreList = [IgnoreType.year, IgnoreType.month, IgnoreType.date, IgnoreType.hour, IgnoreType.minute, IgnoreType.second, IgnoreType.millsecond]
const _IgnoreLength = IgnoreList.length;

/**
 * 判断【目标时间】相比【指定时间】是否过期
 * @param {number} target 目标时间戳
 * @param {?string} ignore 需要忽略的时间单位 ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
 * @param {?number} specify 指定时间戳
 */
export function isExpired(target: number, ignore?: IgnoreType, specify?: number) {
  // 非法日期报错
  if (!dayjs(target).isValid()) {
    throw new Error('AileKit isExpired Error: Invalid Date!');
  }

  let res = false;
  const targetList = dayjs(target).toArray();
  const specifyList = dayjs(specify).toArray();

  const startIdx = ignore ? IgnoreList.indexOf(ignore) + 1 : 0;
  for (let i = startIdx; i < _IgnoreLength - 1; i++) {
    if (targetList[i] === specifyList[i]) {
      continue;
    }
    res = targetList[i] > specifyList[i];
    break;
  }
  return res;
}

/**
 * 忽略日期的情况下，判断【目标时间】相比【指定时间】是否过期
 * @param {number} target 目标时间戳
 * @param {?number} specify 指定时间戳
 */
export function isExpiredIgnoreDate(target: number, specify?: number) {
  return isExpired(target, IgnoreType.date, specify);
}
