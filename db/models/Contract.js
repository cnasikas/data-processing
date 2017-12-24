import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const AccountModel = mongoose.model('Contract', schemes['contract'])

export default AccountModel
