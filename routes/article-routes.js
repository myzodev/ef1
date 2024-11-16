import express from 'express'
import Articles from '../controllers/articles-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'
import { doesHavePermissionToEdit } from '../middlewares/article-middleware.js'
import fileUpload from '../utils/file-upload.js'

const articleRoutes = express.Router()

articleRoutes.get('/', Articles.index)

articleRoutes.get('/create', redirectIfAuthenticated, Articles.blogCreate)
articleRoutes.post('/create', fileUpload.single('image'), Articles.blogCreatePost)

articleRoutes.get('/:slug', Articles.blogItem)
articleRoutes.get('/:slug/edit', doesHavePermissionToEdit, Articles.blogItemEdit)
articleRoutes.post('/:slug/edit', fileUpload.single('image'), Articles.blogItemEditPost)
articleRoutes.post('/:slug/delete', Articles.blogItemDelete)

export default articleRoutes
