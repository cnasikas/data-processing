import {buildActionTypes} from '../utils/actions'

const types = [
  'ADD_NOTIFICATION',
  'REMOVE_NOTIFICATION',
  'GET_CONTRACT_TYPES',
  'GET_CONTRACT_TYPES_SUCCESS',
  'GET_DATASTORE',
  'GET_DATASTORE_SUCCESS',
  'GET_DATA',
  'GET_DATA_SUCCESS',
  'ADD_DATA',
  'ADD_DATA_SUCCESS',
  'GET_REQUESTS',
  'GET_REQUESTS_SUCCESS',
  'GET_REQUEST',
  'GET_REQUEST_SUCCESS',
  'ADD_REQUEST',
  'ADD_REQUEST_SUCCESS',
  'GET_PROCESSORS',
  'GET_PROCESSORS_SUCCESS',
  'GET_PROCESSOR',
  'GET_PROCESSOR_SUCCESS',
  'ADD_PROCESSOR',
  'ADD_PROCESSOR_SUCCESS',
  'GET_ACCOUNTS',
  'GET_ACCOUNTS_SUCCESS',
  'GET_ACCOUNT',
  'GET_ACCOUNT_SUCCESS',
  'SET_DEFAULT_ACCOUNT',
  'SET_DEFAULT_ACCOUNT_SUCCESS'
]

const objTypes = buildActionTypes(types)

export default objTypes
