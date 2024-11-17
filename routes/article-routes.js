import express from 'express'
import Articles from '../controllers/articles-controller.js'
import { redirectIfAuthenticated } from '../middlewares/auth-middleware.js'
import { doesHavePermissionToEdit } from '../middlewares/article-middleware.js'
import fileUpload from '../utils/file-upload.js'

const articleRoutes = express.Router()

articleRoutes.get('/', Articles.index)

articleRoutes.get('/create', redirectIfAuthenticated, Articles.articleCreate)
articleRoutes.post('/create', fileUpload.single('image'), Articles.articleCreatePost)

articleRoutes.get('/:slug/:id', Articles.articleItem)
articleRoutes.get('/:slug/:id/edit', doesHavePermissionToEdit, Articles.articleItemEdit)
articleRoutes.post('/:slug/:id/edit', fileUpload.single('image'), Articles.articleItemEditPost)
articleRoutes.post('/:slug/:id/delete', Articles.articleItemDeletePost)

export default articleRoutes
