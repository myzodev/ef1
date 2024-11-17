import express from 'express'
import Admin from '../controllers/admin-controller.js'
import { redirectIfAuthenticated } from '../middlewares/auth-middleware.js'
import fileUpload from '../utils/file-upload.js'

const adminRoutes = express.Router()

adminRoutes.get('/', redirectIfAuthenticated, Admin.index)

adminRoutes.get('/profile', redirectIfAuthenticated, Admin.profileEdit)
adminRoutes.post('/profile/edit', fileUpload.single('avatar'), Admin.profileEditPost)

export default adminRoutes
