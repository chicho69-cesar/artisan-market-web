import type * as yup from 'yup'
import type { ValidationError } from '../interfaces'

export const makeValidation = async <T>(schema: yup.Schema, value: T) => {
  try {
    await schema.validate(value)
    return null
  } catch (error: any) {
    return (error as ValidationError).message
  }
}
