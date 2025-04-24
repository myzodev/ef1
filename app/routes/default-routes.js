import express from 'express'
import Default from '../controllers/default-controller.js'

const defaultRoutes = express.Router()

defaultRoutes.get('/', Default.index)
defaultRoutes.get('/drivers', Default.drivers)
defaultRoutes.get('/teams', Default.teams)

export default defaultRoutes
