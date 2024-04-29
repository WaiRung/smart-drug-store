// It will be available as isFormValidate() (camelCase of file name without extension)
// export default function (formValues: { [key: string]: { isValid: boolean, val: string, required: boolean, format?: RegExp }; }) {
export default function (formValues: { [key: string]: formfieldInterface; }) {
  for (const key in formValues) {
    if (Object.hasOwnProperty.call(formValues, key)) {
      if (!formValues[key].isValid) {
        return false
      }
    }
  }
  return true

}