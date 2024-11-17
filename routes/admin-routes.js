import express from 'express'
import Admin from '../controllers/admin-controller.js'
import { checkUserLoggedIn } from '../middlewares/auth-middleware.js'
import fileUpload from '../utils/file-upload.js'

const adminRoutes = express.Router()

adminRoutes.get('/', checkUserLoggedIn, Admin.index)

adminRoutes.get('/profile', checkUserLoggedIn, Admin.profileEdit)
adminRoutes.post('/profile/edit', [checkUserLoggedIn, fileUpload.single('avatar')], Admin.profileEditPost)

export default adminRoutes
