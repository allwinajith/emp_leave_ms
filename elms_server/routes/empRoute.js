import express from 'express'
import { getEmpCtrlr, postEmpCtrlr } from '../controllers/empController.js'

const empRoute = express.Router()

empRoute.get('/', getEmpCtrlr)
empRoute.post('/', postEmpCtrlr)

export default empRoute;