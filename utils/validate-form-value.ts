// It will be available as validateformValue() (camelCase of file name without extension)
export default function (formValue: formfieldInterface) {
    if (formValue.val) {
        if (formValue.format) {
          if (!formValue.format.test(formValue.val)) {
            return false
          } else {
            return true
          }
        } else {
            return true
        }
      } else {
        return true
      }

  }