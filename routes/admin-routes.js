import express from 'express'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'

const adminRoutes = express.Router()

adminRoutes.get('/', redirectIfAuthenticated, async (req, res) => {
	res.render('admin', { activeNav: 'admin' })
})

export default adminRoutes
