import { clearForm, clearCloneForm } from '../src/libs/clearForm'

const form = {
  name: 'Bob',
  age: 18,
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

describe('测试：clearForm 函数', () => {
  test('默认参数', () => {
    const _form = JSON.parse(JSON.stringify(form))
    const expected = {
      name: 'Bob',
      age: 18,
      count: 0,
      users: 'Lily,Mike,Tom',
      location: [
        {
          area_id: 1,
          area_name: {
            code: 123,
            name: 'America'
          }
        }
      ],
      array: ['fruit']
    }
    expect(clearForm(_form)).toEqual(expected)
    expect(_form).toEqual(expected)
  })
  test('默认参数 + 格式化特殊字段', () => {
    const _form = JSON.parse(JSON.stringify(form))
    const expected = {
      name: 'Bob',
      age: 18,
      count: 0,
      users: ['Lily', 'Mike', 'Tom'],
      location: [
        {
          area_id: 1,
          area_name: {
            code: 123,
            name: 'America'
          }
        }
      ],
      array: ['fruit']
    }
    expect(clearForm(_form, {
      formatter: (form, key) => {
        if (key === 'users') {
          return form[key].split(',')
        }
        return form[key]
      }
    })).toEqual(expected)
    expect(_form).toEqual(expected)
  })
})

describe('测试：clearCloneForm 函数', () => {
  test('默认参数', () => {
    expect(clearCloneForm(form)).toEqual({
      name: 'Bob',
      age: 18,
      count: 0,
      users: 'Lily,Mike,Tom',
      location: [
        {
          area_id: 1,
          area_name: {
            code: 123,
            name: 'America'
          }
        }
      ],
      array: ['fruit']
    })
  })
  test('默认参数 + 格式化特殊字段', () => {
    expect(clearCloneForm(form, {
      formatter: (form, key) => {
        if (key === 'users') {
          const newVal = form[key].replace(/，/gu, ',').split(',');
          if (newVal.length) {
            form['hi_users'] = newVal;
          }
          return null;
        }
        return form[key]
      }
    })).toEqual({
      name: 'Bob',
      age: 18,
      count: 0,
      hi_users: ['Lily', 'Mike', 'Tom'],
      location: [
        {
          area_id: 1,
          area_name: {
            code: 123,
            name: 'America'
          }
        }
      ],
      array: ['fruit']
    })
  })
})
