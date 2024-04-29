import { describe, expect, test } from 'vitest'
import { isFormValidate, validateForm, validateFormValue } from "#imports";

describe('test is-form-validate functionalities', () => {
  test('the form should be valid if all isValids are true', () => {
    expect(isFormValidate(
      {
        selectedDrug: {
          isValid: true,
          val: '',
          required: true
        },
        desease: {
          isValid: true,
          val: '',
          required: true
        },
        ageRange: {
          isValid: true,
          val: '',
          required: true
        },
        weight: {
          isValid: true,
          val: '',
          required: true
        },
        concentration: {
          isValid: true,
          val: '',
          required: false
        }
      }
    )).toBe(true)
  })

  test('the form should be inValid if any of the isValids is false', () => {
    expect(isFormValidate(
      {
        selectedDrug: {
          isValid: true,
          val: '',
          required: true
        },
        desease: {
          isValid: true,
          val: '',
          required: true
        },
        ageRange: {
          isValid: true,
          val: '',
          required: true
        },
        weight: {
          isValid: true,
          val: '',
          required: true
        },
        concentration: {
          isValid: false,
          val: '',
          required: false
        }
      }
    )).toBe(false)
  })

  test('the values should conform to their format if the format exists', () => {
    expect(validateFormValue(
        {
          isValid: true,
          val: 'qwer',
          required: false,
          format: /^[1-9][0-9]?$|^100$/,
        }
    )).toBe(false)
  })

  test('the form fields should be inValid if required fields are empty', () => {
    expect(validateForm(
      {
        selectedDrug: {
          isValid: true,
          val: '',
          required: true
        },
        desease: {
          isValid: true,
          val: '',
          required: true
        },
        ageRange: {
          isValid: true,
          val: '',
          required: true
        },
        weight: {
          isValid: true,
          val: '',
          required: true
        },
        concentration: {
          isValid: true,
          val: '',
          required: false
        }
      }
    )).toStrictEqual({
      selectedDrug: {
        isValid: false,
        errorMsg: 'กรุณาเลือก',
        val: '',
        required: true
      },
      desease: {
        isValid: false,
        errorMsg: 'กรุณาเลือก',
        val: '',
        required: true
      },
      ageRange: {
        isValid: false,
        errorMsg: 'กรุณาเลือก',
        val: '',
        required: true
      },
      weight: {
        isValid: false,
        errorMsg: 'กรุณาเลือก',
        val: '',
        required: true
      },
      concentration: {
        isValid: true,
        val: '',
        required: false
      }
    })
  })

  // test('has a default max of 10', () => {
  //   expect(isFormValidate(10)).toBe(10)
  // })
})