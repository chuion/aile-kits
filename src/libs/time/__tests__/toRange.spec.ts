import { toRange } from '../functions/toRange';

const time = 1610524316000; // 2021-01-13 15:51:56

describe('测试目标: toRange 函数', () => {
  test('默认参数格式', () => {
    expect(toRange(time)).toMatchObject({
      start_time: 1610467200000,
      end_time: 1610553599999,
    });
  });

  test('设置option字段', () => {
    expect(toRange(time, { start: 'start', end: 'end' })).toMatchObject({
      start: 1610467200000,
      end: 1610553599999,
    });
  });

  test('设置空值格式', () => {
    expect(toRange(0, { nullValue: 'empty' })).toMatchObject({
      start_time: 'empty',
      end_time: 'empty',
    });
  });

  test('设置格式化输出', () => {
    expect(toRange(time, { formatter: 'MM/DD-HH:mm' })).toMatchObject({
      start_time: '01/13-00:00',
      end_time: '01/13-23:59',
    });
  });

  test('设置option字段 + 格式化输出', () => {
    expect(toRange(time, { start: 'start', end: 'end', formatter: 'MM/DD-HH:mm' })).toMatchObject({
      start: '01/13-00:00',
      end: '01/13-23:59',
    });
  });

  // test('输入非法日期应报错', () => {
  //   expect(() => toRange('hello')).toThrow('AileKit toRange Error: Invalid Date!');
  // });
});
