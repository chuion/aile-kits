import axios, { AxiosInstance, CancelTokenSource } from 'axios';

export type RequestQueueOption = {
  whiteList?: string[]
  router?: any
  service: AxiosInstance
  useCurrentHttp?: boolean
}

/**
 * 注：拦截器是链式，实例初始化须在 axios.create后进行，此实例响应拦截器的response需要原始数据而不是经过格式化后的数据
 */
export class RequestQueue {
  private httpStore: Map<string, CancelTokenSource>
  private whiteList: string[]
  private useCurrentHttp: boolean
  private router
  private service

  constructor(
    option: RequestQueueOption
  ) {

    // 缓存列表
    this.httpStore = new Map();
    // 白名单
    this.whiteList = option.whiteList || [];
    // 重复请求 使用最新请求
    this.useCurrentHttp =
      typeof option.useCurrentHttp === 'boolean' ? option.useCurrentHttp : true;
    // 路由实例
    this.router = option.router;
    // axios实例
    this.service = option.service;
    this.init();
  }

  private init() {
    if (!this.service) {
      throw Error('Need a axios Instance');
    }
    // 请求拦截
    this.service.interceptors.request.use(config => {
      this.add(config);
      return config;
    });
    // 响应拦截
    this.service.interceptors.response.use((response) => {
      this.remove(response.config);
      return response;
    });
    if (this.router) {
      this.router.beforeEach((to: any, from: any, next: Function) => {
        // 当通过router.replace添加地址栏query时不触发清理
        if (to.name !== from.name) {
          this.clear();
        }
        next();
      });
    }
  }

  /**
   * 根据请求/响应体 生成对应key
   * @param {Object} config
   */
  private getKey({ method = '', url = '', params = undefined, data = undefined }): string {
    const formatParam = params
      ? typeof params === 'object'
        ? JSON.stringify(params)
        : params
      : '';
    const formatData = data
      ? typeof data === 'object'
        ? JSON.stringify(data)
        : data
      : '';
    return `${method}${url}${formatParam}${formatData}`;
  }

  /**
   * 缓存请求
   * @param {*} config 请求对象
   */
  public add(config: any) {
    if (this.whiteList.includes(config.url)) return;
    const key = this.getKey(config);
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    // 是否重复
    if (this.httpStore.has(key)) {
      // 优先使用请求自定义配置
      const useCurrentHttp =
        typeof config.useCurrentHttp === 'boolean'
          ? config.useCurrentHttp
          : this.useCurrentHttp;
      // 重复请求
      if (useCurrentHttp) {
        // 中断老请求
        const item = this.httpStore.get(key)
        if (item) {
          item.cancel();
          this.httpStore.delete(key);
        }
        // 添加最新请求
        this.httpStore.set(key, source);
      } else {
        // 中断当前请求
        source.cancel();
      }
    } else {
      this.httpStore.set(key, source);
    }
  }

  /**
   * 删除已成功请求
   */
  public remove(config: any) {
    if (this.whiteList.includes(config.url)) return;
    const key = this.getKey(config);
    if (this.httpStore.has(key)) {
      this.httpStore.delete(key);
    }
  }

  /**
   * 清空缓存列表
   */
  public clear() {
    this.httpStore.forEach((source) => {
      source.cancel();
    });
    this.httpStore.clear();
  }
}
