import _ from 'lodash'
import blockchain from 'blockchain'
import { isString } from './helpers'

const ledger = blockchain()
const NodeClass = ledger.NodeClass

/* eslint-disable-next-line no-unused-vars */
class NoMetamaskError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'MetaMask must be installed and enabled.'
  }
}

const buildActionTypes = (types) => {
  return types.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {})
}

const createSimpleAction = (type) => {
  return (data = {}) => {
    return { type, payload: { ...data } }
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

const createBlockchainAction = (contractMethod, after, dataToArgs, dataPreprocess = data => data) => {
  return (data) => {
    return async dispatch => {
      const node = new NodeClass()
      await node.init()

      data = dataPreprocess(data)
      const dataArgs = dataToArgs(data)
      const tx = await node[contractMethod](...dataArgs)

      const obj = {
        ...data,
        txId: tx
      }

      dispatch(after({}, obj))

      return `Tx: ${tx}`
    }
  }
}

const buildActions = (actions) => {
  actions = { ...actions }

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
  createBlockchainAction,
  buildActions
}
