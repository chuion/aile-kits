declare type ClearFormOption = {
    deleteStartsWith: string;
    formatter: (form: any, key: string) => any;
};
export declare function clearForm(form: any, option?: Partial<ClearFormOption>): any;
export declare function clearCloneForm(form: any, option?: Partial<ClearFormOption>): any;
export {};
