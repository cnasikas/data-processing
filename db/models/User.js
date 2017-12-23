import mongoose from 'mongoose'
import schemes from '../schemes/schemes'

const UserModel = mongoose.model('User', schemes['user'])

export default UserModel
