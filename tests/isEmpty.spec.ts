import { isEmpty } from '../src/libs/isEmpty'

describe('测试：isEmpty 函数', () => {
  test('检测空数组', () => {
    expect(isEmpty([])).toBe(true)
  })
  test('检测非空数组', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })
  test('检测空对象', () => {
    expect(isEmpty({})).toBe(true)
  })
  test('检测非空对象', () => {
    expect(isEmpty({ foo: 'bar' })).toBe(false)
  })
  test('检测空字符串', () => {
    expect(isEmpty('')).toBe(true)
  })
  test('检测非空字符串', () => {
    expect(isEmpty('foo')).toBe(false)
  })
  test('检测布尔值true', () => {
    expect(isEmpty(true)).toBe(false)
  })
  test('检测布尔值false', () => {
    expect(isEmpty(false)).toBe(false)
  })
  test('检测Symbol类型', () => {
    expect(isEmpty(Symbol(''))).toBe(false)
  })
  test('检测Symbol类型', () => {
    expect(isEmpty(Symbol(666))).toBe(false)
  })
  test('检测空Map', () => {
    expect(isEmpty(new Map())).toBe(true)
  })
  test('检测非空Map', () => {
    const data = new Map()
    data.set('foo', 'bar')
    expect(isEmpty(data)).toBe(false)
  })
  test('检测空Set', () => {
    expect(isEmpty(new Set())).toBe(true)
  })
  test('检测非空Set', () => {
    expect(isEmpty(new Set(['foo']))).toBe(false)
  })
  test('检测数字0', () => {
    expect(isEmpty(0)).toBe(false)
  })
  test('检测数字1', () => {
    expect(isEmpty(1)).toBe(false)
  })
  test('检测Null', () => {
    expect(isEmpty(null)).toBe(true)
  })
  test('检测Undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })
  test('检测函数', () => {
    expect(isEmpty(() => { })).toBe(false)
  })
})
