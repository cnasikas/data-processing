import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const AccountModel = mongoose.model('Account', schemes['account'])

export default AccountModel
