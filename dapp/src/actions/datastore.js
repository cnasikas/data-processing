import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getDataStore: [types.GET_DATASTORE, 'datastore'],
  getData: [types.GET_DATA, 'datastore/:id'],
  addData: [types.ADD_DATA, 'datastore', 'post', {headers: { 'content-type': 'multipart/form-data' }}]
})

export default actions
