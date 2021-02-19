export declare enum IgnoreType {
    year = "year",
    month = "month",
    date = "date",
    hour = "hour",
    minute = "minute",
    second = "second",
    millsecond = "millisecond"
}
export declare function isExpired(target: number, ignore?: IgnoreType, specify?: number): boolean;
export declare function isExpiredIgnoreDate(target: number, specify?: number): boolean;
