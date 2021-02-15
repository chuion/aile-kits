<p align="center">
  <img src="./docs/assets/aile-kits_logo.png">
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/aile-kits">
    <img src="https://img.shields.io/npm/v/aile-kits.svg">
  </a>
  <a href="https://npmcharts.com/compare/aile-kits?minimal=true">
    <img src="http://img.shields.io/npm/dm/aile-kits.svg">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Features

`AileKits` 是一套工具函数包，区别于 `lodash` 的全面，`AileKits` 更加专注于实现一些（我自己）实际业务中遇到的一些需求。目前已实现的工具函数包括：

- 通用类

|             工具名称              | 工具类型 |       工具说明        |
| :-------------------------------: | :------: | :-------------------: |
|      [checkType](#checktype)      |   函数   |     数据类型检测      |
|        [isEmpty](#isempty)        |   函数   |       空值检测        |
|      [clearForm](#clearform)      |   函数   | 空值清理 (修改原对象) |
| [clearCloneForm](#clearcloneform) |   函数   | 空值清理 (克隆原对象) |

- time插件：时间处理相关

|                  工具名称                   | 工具类型 |        工具说明         |
| :-----------------------------------------: | :------: | :---------------------: |
|          [formatTime](#formattime)          |   函数   |       时间格式化        |
|           [isExpired](#isexpired)           |   函数   |      时间是否超限       |
| [isExpiredIgnoreDate](#isexpiredignoredate) |   函数   | 时间是否超限 (忽略日期) |
|             [toRange](#torange)             |   函数   |      时间戳转对象       |

- request插件：请求处理相关

| 工具名称 | 工具类型 |     工具说明      |
| :------: | :------: | :---------------: |
|  queue   | Class类  | 取消axios重复请求 |

## Install

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-kits

# 或者
yarn add aile-kits
```

## Quick Start

1. 通用类组件可直接使用

```js
// 全量引用
import AileKits from 'aile-kits';
console.log(AileKits.checkType('hello'));
// => 'string'

// or 按需引用
import { checkType } from 'aile-kits';
console.log(checkType('hello'));
// => 'string'
```

2. 插件系统：部分插件需要安装第三方依赖，按需选择

- 直接使用

```js
import { formatTime } from 'aile-kits/esm/plugins/time';
const res = formatTime(1582884000000, 'fmt:Mm');
console.log(res)
// => '02-28 18:00'
```

- 设置插件参数

```js
import AileKits from 'aile-kits';
import time, { formatTime } from 'aile-kits/esm/plugins/time';
AileKits.extend(time, {
  formatTime: {
    template: 'YYYY年MM月DD日 HH:mm'
  },
  toRange: {
    start: 'start',
    end: 'end',
    nullValue: null
  }
})

const res1 = AileKits.time.formatTime(1582884000000, 'fmt:Mm');
const res2 = time.formatTime(1582884000000, 'fmt:Mm');
const res3 = formatTime(1582884000000, 'fmt:Mm');

console.log(res1, res1 === res2, res2 === res3)
// => '02月28日 18:00' 'true' 'true'
```

## Documentation

### checkType

**说明**

`checkTye(value)`
数据类型检测

**参数**

- **value(*)**
需要检测的数据

**返回值**

- **(string)**: 枚举值列表：string / number / boolean / undefined / null / function / object / array / set / weakset / map / weakmap / symbol

**示例**

```js
const data = [1, 2, 3];
const res = checkType(data);

console.log(res);
// => 'array'
```

### isEmpty

**说明**

`isEmpty(value)`
空值检测，除下列值外，其余均为非空，返回 `false` :

- ''
- []
- {}
- Map{0}
- Set{0}
- null
- undefined

**参数**

- **value(*)**
需要检测的数据

**返回值**

- **(boolean)**: 如果值为空，则返回 `true` ，否则返回 `false`

**示例**

```js
const data = [1, 2, 3];
const res = checkType(data);

console.log(res);
// => 'array'
```

### clearForm

**说明**

`clearForm(form, [option = {}])`
清理表单中的空值，该函数会直接修改传入的表单数据

**参数**

- **form(*)**
需要清理的表单，建议传入 object / array
- **[option = {}] (Object)**
可选函数配置

```ts
type ClearFormOption = {
  deleteStartsWith: string  // 匹配删除字段的规则，默认值 '_' ，即以 `_`开头的字段会被删除
  formatter: (form: any, key: string) => any // 处理每个字段的回调函数，默认值为 (form, key) => form[key]
}
```

**返回值**

- **(object/array/*)**: 正常情况返回一个对象或数组，当 `typeof form !== 'object'` 时，原样返回

**示例**

```js
const form = {
  name: 'Bob',
  count: 0,
  _isLeader: false,
  gender: '',
  users: 'Lily,Mike,Tom',
  location: [
    {
      area_id: 1,
      area_name: {
        code: 123,
        name: 'America'
      }
    },
    {
      area_id: undefined,
      area_name: {}
    }
  ],
  array: ['fruit'],
  nullArray: [],
  nullArrayObject: [
    {
      start: undefined,
      end: undefined
    }
  ]
}

clearForm(form, {
    formatter: (form, key) => {
        if (key === 'users') {
            return form[key].split(',')
        }
        return form[key]
    }
})

console.log(form)
// => 
// {
//     name: 'Bob',
//     count: 0,
//     users: ['Lily', 'Mike', 'Tom'],
//     location: [
//         {
//             area_id: 1,
//             area_name: {
//                code: 123,
//                name: 'America'
//             }
//         }
//     ],
//     array: ['fruit']
// }
```

### clearCloneForm

**说明**

`clearForm(form, [option = {}])`
清理表单中的空值，该函数会**克隆原表单**，不会直接修改传入的表单数据

**参数**

同 [clearForm](#clearform)

**返回值**

同 [clearForm](#clearform)

### formatTime

**说明**

`formatTime([value = Date.now()], [format = 'YYYY-MM-DD HH:mm:ss'], [timeFormat = undefined], [template = 'YYYY-MM-DD HH:mm:ss'] )`
基于 `dayjs` 实现的时间格式化工具，可设置**期望输出的时间格式**和**当前传入的时间格式**以便于解析。

**参数**

- **value(string|number)**
目标时间，支持数字时间戳和字符串，不传则使用当前时间戳
- **format(string)**
期望输出的时间格式，默认值为 `'YYYY-MM-DD HH:mm:ss'`
支持以 `'fmt:'` 开头快速设置模板，匹配规则为首尾截断，例如 `'fmt:MD'` 表示 `'MM-DD'`
支持全局配置*
- **timeFormat(string)**
当前传入的时间格式
- **template(string)**
设置函数默认输出模板，便于 `format` 通过 `'fmt:'` 快速设置

**返回值**

- **(string)**: 根据模板输出相应字符串

**示例**

```js
const time = 1582884000000;
const fmtTime = '2020年2月28日 18点00分00秒'

const res1 = formatTime(time, 'fmt:Mm')
const res2 = formatTime(fmtTime, 'MM/DD', 'YYYY年M月DD日 HH点mm分ss秒'

console.log(res1)
// => '02-28 18:00'

console.log(res2);
// => '02/28'
```
### isExpired

**说明**

`isExpired([target = Date.now()], [ignore = 0], [specify] )`
基于 `dayjs` 实现，判断【目标时间】是否超过【指定时间】。

**参数**

- **target(timestamp)**
目标时间，格式为时间戳
- **ignore(string)**
需要忽略的时间单位，支持：`year` / `month` / `date` / `hour` / `minute` / `second` / `millisecond`
不传则不使用忽略项，从【年】开始比较
例如：输入 `date` 后，对日期以上的单位不再比较，仅比较【时/分/秒/毫秒】
- **specify(timestamp)**
指定时间，格式为时间戳，不传则使用当前时间

**返回值**

- **(boolean)**: 如果【目标时间】超过【指定时间】，则返回 `true` ，否则返回 `false`

**示例**

```js
const TimeModel = {
  '23:59': 1582905599000,  // 2020-02-28 23:59:59
  '00:00': 1582819200000,  // 2020-02-28 00:00:00
  '18:00': 1591005600000  // 2020-06-01 18:00:00
}

const res1 = isExpired(TimeModel['23:59'])
const res2 = isExpired(TimeModel['00:00'], 'date')
const res3 = isExpired(TimeModel['23:59'], 'date', TimeModel['18:00'])

console.log(res1)
// => false
console.log(res2)
// => false
console.log(res3)
// => true
```

### isExpiredIgnoreDate

**说明**

`isExpiredIgnoreDate([target = Date.now()], [specify] )`
基于 `dayjs` 实现，[isExpired](#isexpired) 的拓展函数，忽略日期比较时间。

**参数**

- **target(timestamp)**
目标时间，格式为时间戳
- **specify(timestamp)**
指定时间，格式为时间戳，不传则使用当前时间

**返回值**

- **(boolean)**: 如果【目标时间】超过【指定时间】，则返回 `true` ，否则返回 `false`

**示例**

```js
const TimeModel = {
  '23:59': 1582905599000,  // 2020-02-28 23:59:59
  '00:00': 1582819200000,  // 2020-02-28 00:00:00
  '18:00': 1591005600000  // 2020-06-01 18:00:00
}

const res1 = isExpiredIgnoreDate(TimeModel['23:59']
const res2 = isExpiredIgnoreDate(TimeModel['00:00'], TimeModel['18:00'])

console.log(res1)
// => true
console.log(res2)
// => false
```

### toRange

**说明**

`toRange(target, [config = {}] )`
基于 `dayjs` 实现，分别调用 `startOf` 和 `endOf` 方法，输出对象格式，默认为 `{ start_time: timestamp, end_time: timestamp }`。

**参数**

- **target(timestamp)**
目标时间，格式为时间戳
- **config(object)**
支持的参数
```ts
type ToRangeConfig = {
  start?: string  // 需要输出的初始字段
  end?: string    // 需要输出的结束字段
  nullValue?: any // 定义空值形式
  formatter?: string // 自定义输出格式，默认输出时间戳
  range?: string  // 需要转化的时间单位，默认为'day'
}
```

**返回值**

- **object({[start]: any, [end]: any})**: 

**示例**

```js
const time = 1610524316000; // 2021-01-13 15:51:56

const res1 = toRange(time)
const res2 = toRange(time, { start: 'start', end: 'end', formatter: 'MM/DD-HH:mm' })

console.log(res1)
// => 
// {
//   start_time: 1610467200000,
//   end_time: 1610553599999,
// }
console.log(res2)
// => 
// {
//   start: '01/13-00:00',
//   end: '01/13-23:59',
// }
```