import express from 'express'
import Admin from '../controllers/admin-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'
import fileUpload from '../utils/file-upload.js'

const adminRoutes = express.Router()

adminRoutes.get('/', redirectIfAuthenticated, Admin.index)

adminRoutes.get('/profile', redirectIfAuthenticated, Admin.profile)
adminRoutes.post('/profile/edit', fileUpload.single('avatar'), Admin.profileEdit)

export default adminRoutes
