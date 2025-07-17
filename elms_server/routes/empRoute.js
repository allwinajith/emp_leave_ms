import express from 'express'
import { deleteEmpCntrlr, getEmpCtrlr, postEmpCtrlr, updateEmpCntrlr } from '../controllers/empController.js'

const empRoute = express.Router()

empRoute.get('/', getEmpCtrlr)
empRoute.post('/', postEmpCtrlr)
empRoute.put('/:id', updateEmpCntrlr)
empRoute.delete('/:id', deleteEmpCntrlr)

export default empRoute;