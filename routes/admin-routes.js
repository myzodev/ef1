import express from 'express'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'

const adminRoutes = express.Router()

adminRoutes.get('/', redirectIfAuthenticated, async (req, res) => {
	res.render('admin/admin', { activeNav: 'admin' })
})

adminRoutes.get('/profile', redirectIfAuthenticated, async (req, res) => {
	res.render('admin/profile', { activeNav: 'admin' })
})

export default adminRoutes
