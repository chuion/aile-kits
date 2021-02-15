import { formatTime } from '../functions/formatTime';

const time = 1582884000000;
const fmtTime = '2020年2月28日 18点00分00秒'

describe('测试目标: formatTime 函数', () => {
  test('使用 默认时间 + 默认输出模板 进行输出', () => {
    expect(formatTime()).not.toBe('Invalid Date');
    expect(formatTime('', 'MM/DD')).not.toBe('Invalid Date');
  });
  
  test('使用 默认输出模板 进行输出', () => {
    expect(formatTime(time)).toBe('2020-02-28 18:00:00');
  });
  
  test('使用 预设输出模板 进行输出', () => {
    expect(formatTime(time, 'fmt:Mm')).toBe('02-28 18:00');
  });
  
  test('使用 自定义输出模板 进行输出', () => {
    expect(formatTime(time, 'MM/DD')).toBe('02/28');
  });
  
  test('使用 自定义输入模板 + 自定义输出模板 进行输出', () => {
    expect(formatTime(fmtTime, 'MM/DD', 'YYYY年M月DD日 HH点mm分ss秒')).toBe('02/28');
  });  

  test('输入非法日期应报错', () => {
    expect(() => formatTime('hello')).toThrow('AileKit formatTime Error: Invalid Date!');
  });
})

