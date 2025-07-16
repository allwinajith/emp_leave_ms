import express from 'express'
import { getEmpCtrlr } from '../controllers/empController.js'

const empRoute = express.Router()

empRoute.get('/', getEmpCtrlr)

export default empRoute;