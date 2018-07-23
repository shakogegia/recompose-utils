import {
  compose, withHandlers, withState,
} from 'recompose'

const checkRequired = value => !!value

const defaultMessages = {
  required: 'Field is required!',
}

const getFieldValue = (data, field) => {
  return data[field]
}

const HocValidate = (validationRules) => compose(
  withState('errors', 'updateErrors', {}),
  withHandlers({
    validate: props => (formValues) => {
      let isValid = true

      Object.keys(validationRules).forEach((fieldName) => {
        const fieldRules = validationRules[fieldName].rules.split('|')

        fieldRules.forEach((rule) => {
          let isFieldOk = false
          const fieldValue = getFieldValue(formValues, fieldName)
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
