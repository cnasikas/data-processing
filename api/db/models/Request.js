import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const RequestModel = mongoose.model('Request', schemes['request'])

export default RequestModel
