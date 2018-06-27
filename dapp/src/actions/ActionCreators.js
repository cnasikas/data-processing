import types from './ActionTypes'

export function addNotification (notification = {}) {
  return { type: types.ADD_NOTIFICATION, payload: notification }
}

export function removeNotification (id = -1) {
  return {
    payload: id,
    type: types.REMOVE_NOTIFICATION
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
    type: types.GET_CONTRACT_TYPES
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
    type: types.GET_DATASTORE
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
    type: types.GET_DATA
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
    type: types.ADD_DATA
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
    type: types.GET_REQUESTS
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
    type: types.GET_REQUEST
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
    type: types.ADD_REQUEST
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
    type: types.GET_PROCESSORS
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
    type: types.GET_PROCESSOR
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
    type: types.ADD_PROCESSOR
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
    type: types.GET_ACCOUNTS
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
    type: types.GET_ACCOUNT
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
    type: types.SET_DEFAULT_ACCOUNT
  }
}
