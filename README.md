# Recompose utilities

withEvents, withValidation for recompose

install
```
npm i recompose-utils
```
or 
```
yarn add recompose-utils
```

### withEvents

import withEvents

```js
import { withEvents } from recompose-utils
```

and than you have emmiters and handlers

you can pass `withEvents` to composed component where you want to emitt event

```jsx
  withEvents({
    emitters: ['toggleAuthModal'],
  }),
```
now you have `emitters` prop to your component and you can fire event like this

```jsx
  <button onClicl={() => props.emitters.toggleAuthModal('hi from here') }>
    fire event
  </button>
```


and you pass `withEvents` to composed component where you want to listen to that event


```jsx
  withEvents({
    handlers: {
      toggleAuthModal: (props) => (event) => {
        console.log("event:: toggleAuthModal -fired with data::", event)
      },
    },
  }),
```

### withValidation

import withValidation

```jsx
import { withValidation } from recompose-utils
```

you can pass `withValidation` to composed component with wurles

```jsx
  withValidation({
    name: {
      rules: "required",
      messages: {
        required: "This field is required"
      }
    },
    email: {
      rules: 'require|email',
      messages: {
        require: "This field is required",
        email: "Please, fill with valid email"
      }
    },
  }),
```

and you can validate you form like 
```jsx
  withHandlers({
    handleSave: (props) => () => {
      const isValid = validate(props.formData) // returnes true or false
    },
  }),

```

and you can access your errored filds in `errors` props
error props would be something like this

```jsx
  errors: {
    name: "",
    email: "Please, fill with valid email"
  }
```

