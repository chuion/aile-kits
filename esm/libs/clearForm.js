import { checkType } from "./checkType";
import { isEmpty } from "./isEmpty";
function deleteProp(target, prop) {
    const dataType = checkType(target);
    if (dataType === 'array') {
        target.splice(prop, 1);
    }
    else if (dataType === 'object') {
        delete target[prop];
    }
}
const defaultOption = {
    deleteStartsWith: '_',
    formatter: (form, key) => form[key]
};
export function clearForm(form, option = {}) {
    if (typeof form !== 'object') {
        return form;
    }
    const mergeOption = Object.assign(Object.assign({}, defaultOption), option);
    for (const prop in form) {
        if ({}.hasOwnProperty.call(form, prop)) {
            form[prop] = mergeOption.formatter(form, prop);
            if ((mergeOption.deleteStartsWith && prop.startsWith(mergeOption.deleteStartsWith)) || isEmpty(form[prop])) {
                deleteProp(form, prop);
                continue;
            }
            if (['array', 'object'].includes(checkType(form[prop]))) {
                form[prop] = clearForm(form[prop], option);
                isEmpty(form[prop]) && deleteProp(form, prop);
            }
        }
    }
    return form;
}
export function clearCloneForm(form, option = {}) {
    const _form = JSON.parse(JSON.stringify(form));
    return clearForm(_form, option);
}
