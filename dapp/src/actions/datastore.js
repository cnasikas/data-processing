import types from './ActionTypes'
import {buildActions, createBlockchainAction} from '../utils/actions'
import {slugify} from '../utils/helpers'

const dataToArgs = (data) => {
  return [slugify(data.name), data.name, data.location, data.category, '', data.digest]
}

const dataPreprocess = (data) => {
  return {
    slug: slugify(data.name),
    ...data
  }
}

const actions = buildActions({
  getDataStore: [types.GET_DATASTORE, 'datastore'],
  getData: [types.GET_DATA, 'datastore/:id'],
  addData: [types.ADD_DATA, 'datastore', 'post']
})

const registerDataset = createBlockchainAction('registerDataSet', actions.addData, dataToArgs, dataPreprocess)

export default {
  registerDataset,
  ...actions
}
