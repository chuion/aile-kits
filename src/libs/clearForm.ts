import { checkType } from "./checkType"
import { isEmpty } from "./isEmpty"

type ClearFormOption = {
  deleteStartsWith: string
  formatter: (form: any, key: string) => any
}

function deleteProp(target: any, prop: any) {
  const dataType = checkType(target)
  if (dataType === 'array') {
    target.splice(prop, 1)
  }
  else if (dataType === 'object') {
    delete target[prop]
  }
}

const defaultOption: ClearFormOption = {
  deleteStartsWith: '_',
  formatter: (form, key) => form[key]
}

export function clearForm(form: any, option: Partial<ClearFormOption> = {}) {

  if (typeof form !== 'object') {
    return form;
  }

  const mergeOption = {
    ...defaultOption,
    ...option
  }

  for (const prop in form) {
    if ({}.hasOwnProperty.call(form, prop)) {

      form[prop] = mergeOption.formatter(form, prop)

      if ((mergeOption.deleteStartsWith && prop.startsWith(mergeOption.deleteStartsWith)) || isEmpty(form[prop])) {
        deleteProp(form, prop)
        continue
      }

      if (['array', 'object'].includes(checkType(form[prop]))) {
        form[prop] = clearForm(form[prop], option)
        isEmpty(form[prop]) && deleteProp(form, prop)
      }
    }
  }

  return form;
}

export function clearCloneForm(form: any, option: Partial<ClearFormOption> = {}) {
  const _form = JSON.parse(JSON.stringify(form))
  return clearForm(_form, option);
}
