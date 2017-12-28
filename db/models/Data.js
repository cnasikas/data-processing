import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const DataModel = mongoose.model('Data', schemes['data'])

export default DataModel
