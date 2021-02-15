import { checkType } from '../src/libs/checkType';

describe('target: checkType function', () => {

  test('string type checked', () => {
    expect(checkType('123')).toBe('string');
    expect(checkType('')).toBe('string');
  });

  test('number type checked', () => {
    expect(checkType(0)).toBe('number');
    expect(checkType(1)).toBe('number');
    expect(checkType(-1)).toBe('number');
    expect(checkType(NaN)).toBe('number');
  });

  test('boolean type checked', () => {
    expect(checkType(false)).toBe('boolean');
    expect(checkType(true)).toBe('boolean');
  });

  test('undefined type checked', () => {
    expect(checkType(undefined)).toBe('undefined');
  });

  test('null type checked', () => {
    expect(checkType(null)).toBe('null');
  });

  test('function type checked', () => {
    const func = function () {}
    expect(checkType(func)).toBe('function');
  });

  test('object type checked', () => {
    expect(checkType({})).toBe('object');
    expect(checkType({ foo: 'bar' })).toBe('object');
  });

  test('array type checked', () => {
    expect(checkType([])).toBe('array');
    expect(checkType([1])).toBe('array');
  });

  test('Map type checked', () => {
    expect(checkType(new Map())).toBe('map');
  });

  test('Set type checked', () => {
    expect(checkType(new Set())).toBe('set');
  });

  test('WeakMap type checked', () => {
    expect(checkType(new WeakMap())).toBe('weakmap');
  });

  test('WeakSet type checked', () => {
    expect(checkType(new WeakSet())).toBe('weakset');
  });

  test('Symbol type checked', () => {
    expect(checkType(Symbol('foo'))).toBe('symbol');
  });
});
