import express from 'express'
import Users from '../controllers/auth-controller.js'
import { redirectIfAuthenticated } from '../middlewares/auth-middleware.js'

const authRoutes = express.Router()

authRoutes.get('/register', redirectIfAuthenticated, Users.register)
authRoutes.post('/register', redirectIfAuthenticated, Users.registerPost)

authRoutes.get('/login', redirectIfAuthenticated, Users.login)
authRoutes.post('/login', redirectIfAuthenticated, Users.loginPost)

authRoutes.post('/logout', redirectIfAuthenticated, Users.logoutPost)

export default authRoutes
