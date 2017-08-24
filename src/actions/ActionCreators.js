import { 
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
	GET_CONTRACT_TYPES,
  GET_DATA,
  ADD_DATA,
  GET_ACCOUNT
} from './ActionTypes'

export function addNotification(notification = {}) {
  return { type: ADD_NOTIFICATION, payload: notification }
}

export function removeNotification(id = -1) {
  return {
    payload: id,
    type: REMOVE_NOTIFICATION
  }
}

export function getContractTypes() {

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

export function getData() {
	
  return {
    payload: {
        request: {
        	method: 'get',
            url: '/datastore'
        }
    },
    type: GET_DATA
  }
}

export function addData(data) {

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

export function getAccount() {
  
  return {
    payload: {
        request: {
          method: 'get',
            url: '/account'
        }
    },
    type: GET_ACCOUNT
  }
}


