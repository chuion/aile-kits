import axios from 'axios';
export class RequestQueue {
    constructor(option) {
        this.httpStore = new Map();
        this.whiteList = option.whiteList || [];
        this.useCurrentHttp =
            typeof option.useCurrentHttp === 'boolean' ? option.useCurrentHttp : true;
        this.router = option.router;
        this.service = option.service;
        this.init();
    }
    init() {
        if (!this.service) {
            throw Error('Need a axios Instance');
        }
        this.service.interceptors.request.use(config => {
            this.add(config);
            return config;
        });
        this.service.interceptors.response.use((response) => {
            this.remove(response.config);
            return response;
        });
        if (this.router) {
            this.router.beforeEach((to, from, next) => {
                if (to.name !== from.name) {
                    this.clear();
                }
                next();
            });
        }
    }
    getKey({ method = '', url = '', params = undefined, data = undefined }) {
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
    add(config) {
        if (this.whiteList.includes(config.url))
            return;
        const key = this.getKey(config);
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        if (this.httpStore.has(key)) {
            const useCurrentHttp = typeof config.useCurrentHttp === 'boolean'
                ? config.useCurrentHttp
                : this.useCurrentHttp;
            if (useCurrentHttp) {
                const item = this.httpStore.get(key);
                if (item) {
                    item.cancel();
                    this.httpStore.delete(key);
                }
                this.httpStore.set(key, source);
            }
            else {
                source.cancel();
            }
        }
        else {
            this.httpStore.set(key, source);
        }
    }
    remove(config) {
        if (this.whiteList.includes(config.url))
            return;
        const key = this.getKey(config);
        if (this.httpStore.has(key)) {
            this.httpStore.delete(key);
        }
    }
    clear() {
        this.httpStore.forEach((source) => {
            source.cancel();
        });
        this.httpStore.clear();
    }
}
