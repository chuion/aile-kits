import { AxiosInstance } from 'axios';
export declare type RequestQueueOption = {
    whiteList?: string[];
    router?: any;
    service: AxiosInstance;
    useCurrentHttp?: boolean;
};
export declare class RequestQueue {
    private httpStore;
    private whiteList;
    private useCurrentHttp;
    private router;
    private service;
    constructor(option: RequestQueueOption);
    private init;
    private getKey;
    add(config: any): void;
    remove(config: any): void;
    clear(): void;
}
