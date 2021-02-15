import { IgnoreType, isExpired, isExpiredIgnoreDate } from '../functions/isExpired';

const TimeModel = {
  '23:59': 1582905599000,  // 2020-02-28 23:59:59
  '00:00': 1582819200000,  // 2020-02-28 00:00:00
  '18:00': 1591005600000  // 2020-06-01 18:00:00
}

describe('测试目标: isExpired 函数', () => {
  test('目标时间【2020/2/28 23:59:59】超过指定时间【现在】-> False', () => {
    expect(isExpired(TimeModel['23:59'])).toEqual(false);
  });

  test('忽略日期 -> 目标时间【23:59】超过指定时间【现在】-> True', () => {
    expect(isExpired(TimeModel['23:59'], IgnoreType.date)).toEqual(true);
  });

  test('忽略日期 -> 目标时间【00:00】超过指定时间【现在】-> False', () => {
    expect(isExpired(TimeModel['00:00'], IgnoreType.date)).toEqual(false);
  });

  test('忽略日期 -> 目标时间【23:59】超过指定时间【18:00】-> True', () => {
    expect(isExpired(TimeModel['23:59'], IgnoreType.date, TimeModel['18:00'])).toEqual(true);
  });

  test('忽略月份 -> 目标时间【28号 23:59】超过指定时间【01号 18:00】-> True', () => {
    expect(isExpired(TimeModel['23:59'], IgnoreType.month, TimeModel['18:00'])).toEqual(true);
  });

  test('忽略年份 -> 目标时间【02/28 23:59】超过指定时间【06/01 18:00】-> True', () => {
    expect(isExpired(TimeModel['23:59'], IgnoreType.year, TimeModel['18:00'])).toEqual(false);
  });
})

describe('测试目标: isExpiredIgnoreDate 函数', () => {
  test('目标时间【23:59】超过指定时间【现在】-> True', () => {
    expect(isExpiredIgnoreDate(TimeModel['23:59'])).toEqual(true);
  });

  test('目标时间【00:00】超过指定时间【现在】-> False', () => {
    expect(isExpiredIgnoreDate(TimeModel['00:00'])).toEqual(false);
  });

  test('目标时间【00:00】超过指定时间【18:00】-> False', () => {
    expect(isExpiredIgnoreDate(TimeModel['00:00'], TimeModel['18:00'])).toEqual(false);
  });

  test('目标时间【23:59】超过指定时间【18:00】-> False', () => {
    expect(isExpiredIgnoreDate(TimeModel['23:59'], TimeModel['18:00'])).toEqual(true);
  });
})
