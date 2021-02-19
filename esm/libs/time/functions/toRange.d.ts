export declare type ToRangeConfig = {
    start?: string;
    end?: string;
    nullValue?: any;
    formatter?: string;
    range?: string;
};
export declare function toRange(target: Date | number, config?: ToRangeConfig): {
    [x: number]: any;
};
