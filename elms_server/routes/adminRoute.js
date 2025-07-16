import express from 'express'
import { changeAdminPasswordController, getAdminController, postAdminController } from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute.get('/', getAdminController)
adminRoute.post('/', postAdminController)
adminRoute.put('/', changeAdminPasswordController)

export default adminRoute