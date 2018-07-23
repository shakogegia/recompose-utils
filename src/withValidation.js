import {
  compose, withHandlers, withState,
} from 'recompose'

const checkRequired = value => !!value

const defaultMessages = {
  required: 'Field is required!',
}

const getFieldValue = (data, field, isImmutable = true) => {
  if (!isImmutable) {
    return data[field]
  }

  return data.get(field)
}

const HocValidate = (validationRules, isImmutable) => compose(
  withState('errors', 'updateErrors', {}),
  withHandlers({
    validate: props => (formValues) => {
      let isValid = true

      Object.keys(validationRules).forEach((fieldName) => {
        const fieldRules = validationRules[fieldName].rules.split('|')

        fieldRules.forEach((rule) => {
          let isFieldOk = false
          const fieldValue = getFieldValue(formValues, fieldName, isImmutable)
          const messages = validationRules[fieldName].messages || defaultMessages
          const { errors } = props
          switch (rule) {
          case 'required':
            isFieldOk = checkRequired(fieldValue)
            errors[fieldName] = isFieldOk ? '' : messages.required
            props.updateErrors(errors)
            break
          default:
            isFieldOk = checkRequired(fieldValue)
            break
          }
          isValid = isFieldOk
        })
      })

      return isValid
    },
  }),
)

export default HocValidate
