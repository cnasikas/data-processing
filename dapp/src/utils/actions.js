import _ from 'lodash'
import { isString } from './helpers'

const buildActionTypes = (types) => {
  return types.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {})
}

const createSimpleAction = (type) => {
  return (data = {}) => {
    return {type, payload: {...data}}
  }
}

const createAPIAction = (type, url, action = 'get', options = {}) => {
  return (urlKeys = {}, data = {}) => {
    let replacedUrl = `/${url}`

    replacedUrl = Object.keys(urlKeys).reduce((previous, current) => {
      return previous.replace(`:${current}`, urlKeys[current])
    }, replacedUrl)

    let obj = {
      payload: {
        request: {
          method: action,
          url: replacedUrl,
          ...options
        }
      },
      type
    }

    if (!_.isEmpty(data)) {
      obj.payload.request.data = data
    }

    return obj
  }
}

const buildActions = (actions) => {
  actions = {...actions}

  for (let action in actions) {
    if (actions.hasOwnProperty(action)) {
      if (isString(actions[action])) {
        actions[action] = createSimpleAction(actions[action])
      }

      if (Array.isArray(actions[action])) {
        let [type, url, httpAction = 'get'] = actions[action]
        actions[action] = createAPIAction(type, url, httpAction)
      }
    }
  }

  return actions
}

export {
  buildActionTypes,
  createSimpleAction,
  buildActions
}
