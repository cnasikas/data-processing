import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  GET_CONTRACT_TYPES,
  GET_DATASTORE,
  GET_DATA,
  ADD_DATA,
  GET_REQUESTS,
  GET_REQUEST,
  ADD_REQUEST,
  GET_PROCESSORS,
  GET_PROCESSOR,
  ADD_PROCESSOR,
  GET_ACCOUNTS,
  GET_ACCOUNT,
  SET_DEFAULT_ACCOUNT
} from './ActionTypes'

export function addNotification (notification = {}) {
  return { type: ADD_NOTIFICATION, payload: notification }
}

export function removeNotification (id = -1) {
  return {
    payload: id,
    type: REMOVE_NOTIFICATION
  }
}

export function getContractTypes () {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/contracts'
      }
    },
    type: GET_CONTRACT_TYPES
  }
}

export function getDataStore () {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/datastore'
      }
    },
    type: GET_DATASTORE
  }
}

export function getData (key) {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/datastore/' + key
      }
    },
    type: GET_DATA
  }
}

export function addData (data) {
  return {
    payload: {
      request: {
        method: 'post',
        url: '/datastore',
        data
      }
    },
    type: ADD_DATA
  }
}

export function getRequests () {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/requests'
      }
    },
    type: GET_REQUESTS
  }
}

export function getRequest (key) {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/requests/' + key
      }
    },
    type: GET_REQUEST
  }
}

export function addRequest (data) {
  return {
    payload: {
      request: {
        method: 'post',
        url: '/requests',
        data
      }
    },
    type: ADD_REQUEST
  }
}

export function getProcessors () {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/processors'
      }
    },
    type: GET_PROCESSORS
  }
}

export function getProcessor (key) {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/processors/' + key
      }
    },
    type: GET_PROCESSOR
  }
}

export function addProcessor (data) {
  return {
    payload: {
      request: {
        method: 'post',
        url: '/processors',
        data
      }
    },
    type: ADD_PROCESSOR
  }
}

export function getAccounts () {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/accounts'
      }
    },
    type: GET_ACCOUNTS
  }
}

export function getAccount (key) {
  return {
    payload: {
      request: {
        method: 'get',
        url: '/accounts/' + key
      }
    },
    type: GET_ACCOUNT
  }
}

export function setDefaultAccount (data) {
  return {
    payload: {
      request: {
        method: 'post',
        url: '/accounts',
        data
      }
    },
    type: SET_DEFAULT_ACCOUNT
  }
}
