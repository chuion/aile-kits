import axios from 'axios'
import { RequestQueue } from '../functions/queue'

let queue: any = null;
const service = axios.create()
beforeAll(() => {
  queue = new RequestQueue({ service, whiteList: ['/foo'], useCurrentHttp: true })
})

describe('测试：Request.queue 类', () => {
  test('测试实例初始化成功', () => {
    expect(queue.whiteList).toContain('/foo')
    expect(queue.whiteList).toHaveLength(1)
    expect(queue.useCurrentHttp).toBe(true)
    expect(queue.service).toEqual(service)
    expect(queue.router).toBeUndefined()
  })

  test('测试init方法调用结束后，拦截器新增函数成功', () => {
    expect(queue.service.interceptors.request.handlers).toHaveLength(1)
    expect(queue.service.interceptors.response.handlers).toHaveLength(1)
  })
})

