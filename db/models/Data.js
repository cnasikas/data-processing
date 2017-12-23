import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const DataStoreModel = mongoose.model('Data', schemes['data'])

export default DataStoreModel
