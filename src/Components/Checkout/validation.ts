import * as Yup from 'yup'
import * as cardValidator from 'card-validator'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  cardNumber: Yup.string()
    .required('Card number is required')
    .test('is-valid-card', 'Wrong card number', (value) => {
      if (!value) return false
      const cleanedValue = value.replace(/\s/g, '')
      const validationResult = cardValidator.number(cleanedValue)
      return validationResult.isValid
    }),
  expirationDate: Yup.string()
    .required('Expiration date is required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Wrong MM/YY format')
    .test('is-future-date', 'Expiration date must be in the future', (value) => {
      if (!value) return false
      const [monthStr, yearStr] = value.split('/')
      if (!monthStr || !yearStr) return false

      const month = parseInt(monthStr, 10)
      const year = parseInt(yearStr, 10)

      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (year < currentYear) return false
      if (year === currentYear && month < currentMonth) return false
      return true
    }),
  cvc: Yup.string()
    .required('CVC is required')
    .matches(/^\d{3,4}$/, 'Wrong CVC (3 or 4 digits)'),
})

export default validationSchema
