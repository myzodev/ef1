import express from 'express'
import Admin from '../controllers/admin-controller.js'
import { checkUserLoggedIn, checkUserPermissions } from '../middlewares/auth-middleware.js'
import fileUpload from '../utils/file-upload.js'

const adminRoutes = express.Router()

adminRoutes.get('/', checkUserLoggedIn, Admin.index)

adminRoutes.get('/profile', checkUserLoggedIn, Admin.profileEdit)
adminRoutes.post('/profile/edit', [checkUserLoggedIn, fileUpload.single('avatar')], Admin.profileEditPost)

adminRoutes.get('/users', [checkUserLoggedIn, checkUserPermissions], Admin.profileUsers)
adminRoutes.post('/users/:id/delete', [checkUserLoggedIn, checkUserPermissions], Admin.profileUsersDeletePost)

export default adminRoutes
