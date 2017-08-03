import { 
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
	GET_CONTRACT_TYPES,
	GET_CONTRACTS,
  NEW_CONTRACT
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