import express from 'express'
import Users from '../controllers/users-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'

const userRoutes = express.Router()

userRoutes.get('/register', redirectIfAuthenticated, Users.userRegister)
userRoutes.post('/register', redirectIfAuthenticated, Users.userRegisterPost)

userRoutes.get('/login', redirectIfAuthenticated, Users.userLogin)
userRoutes.post('/login', redirectIfAuthenticated, Users.userLoginPost)

userRoutes.post('/logout', redirectIfAuthenticated, Users.userLogout)

export default userRoutes
