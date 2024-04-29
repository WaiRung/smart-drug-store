// const validateFormValue = require('./validate-form-value')
import validateFormValue from './validate-form-value';

// It will be available as validateForm() (camelCase of file name without extension)
export default function (formValues: { [key: string]: formfieldInterface; }) {
  for (const key in formValues) {
    if (Object.hasOwnProperty.call(formValues, key)) {
      if (formValues[key].required) {
        if (formValues[key].val === '') {
          formValues[key].isValid = false
          formValues[key].errorMsg = `กรุณาเลือก`
        } else {
          formValues[key].isValid = validateFormValue(formValues[key])
        }
      } else {
        formValues[key].isValid = validateFormValue(formValues[key])
      }
    }
  }
  return formValues
}