import React from 'react'
import _ from 'lodash'

import {
  compose, mapProps,
} from 'recompose'

const eventer = {
  emitters: [],
  handlers: {},
  components: [],
}

const HocEvents = ({ emitters = [], handlers = {} }) => compose(
  mapProps(({ ...rest }) => {
    eventer.emitters = _.uniq(_.concat(eventer.emitters, emitters))

    emitters.forEach((emitter) => {
      eventer.emitters[emitter] = emitters[emitter]
    })

    Object.keys(handlers).forEach((handler) => {
      eventer.handlers[handler] = handlers[handler](rest)
    })

    const eventHandlers = {}

    eventer.emitters.forEach((emitter) => {
      eventHandlers[emitter] = (event) => {
        if (eventer.handlers[emitter]) {
          return eventer.handlers[emitter](event)
        }

        return () => false
      }
    })

    return ({
      emitters: eventHandlers,
      ...rest,
    })
  }),
)


export default HocEvents
