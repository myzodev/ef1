import express from 'express'
import Users from '../controllers/auth-controller.js'
import { checkUserLoggedIn } from '../middlewares/auth-middleware.js'

const authRoutes = express.Router()

authRoutes.get('/register', checkUserLoggedIn, Users.register)
authRoutes.post('/register', checkUserLoggedIn, Users.registerPost)

authRoutes.get('/login', checkUserLoggedIn, Users.login)
authRoutes.post('/login', checkUserLoggedIn, Users.loginPost)

authRoutes.post('/logout', checkUserLoggedIn, Users.logoutPost)

export default authRoutes
