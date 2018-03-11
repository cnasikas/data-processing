import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const ProcessorModel = mongoose.model('Processor', schemes['processor'])

export default ProcessorModel
