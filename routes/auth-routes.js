import express from 'express'
import Users from '../controllers/users-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'

const authRoutes = express.Router()

authRoutes.get('/register', redirectIfAuthenticated, Users.userRegister)
authRoutes.post('/register', redirectIfAuthenticated, Users.userRegisterPost)

authRoutes.get('/login', redirectIfAuthenticated, Users.userLogin)
authRoutes.post('/login', redirectIfAuthenticated, Users.userLoginPost)

authRoutes.post('/logout', redirectIfAuthenticated, Users.userLogout)

export default authRoutes
