import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const DataStoreModel = mongoose.model('DataStore', schemes['datastore'])

export default DataStoreModel
