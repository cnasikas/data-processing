import types from './ActionTypes'
import {buildActions, createBlockchainAction} from '../utils/actions'

const dataToArgs = (data) => {
  return [data.digest, data.name, data.location, data.category]
}

const actions = buildActions({
  getDataStore: [types.GET_DATASTORE, 'datastore'],
  getData: [types.GET_DATA, 'datastore/:id'],
  addData: [types.ADD_DATA, 'datastore', 'post']
})

const registerDataset = createBlockchainAction('registerDataSet', actions.addData, dataToArgs)

export default {
  registerDataset,
  ...actions
}
