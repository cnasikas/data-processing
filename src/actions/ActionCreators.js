import { 
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
	GET_CONTRACT_TYPES,
  GET_CONTRACTS,
	GET_CONTRACT,
  NEW_CONTRACT,
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
            url: '/contracts/types'
        }
    },
    type: GET_CONTRACT_TYPES
  }
}

export function getContracts() {
	
  return {
    payload: {
        request: {
        	method: 'get',
            url: '/contracts'
        }
    },
    type: GET_CONTRACTS
  }
}

export function getContract(id) {
  
  return {
    payload: {
        request: {
          method: 'get',
            url: '/contracts/' + id
        }
    },
    type: GET_CONTRACT
  }
}

export function newContract(data) {

  return {
    payload: {
        request: {
          method: 'post',
            url: '/contracts',
            data
        }
    },
    type: NEW_CONTRACT
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


