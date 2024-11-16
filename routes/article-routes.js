import express from 'express'
import Articles from '../controllers/articles-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'
import { doesHavePermissionToEdit } from '../middlewares/article-middleware.js'

const articleRoutes = express.Router()

articleRoutes.get('/', Articles.index)

articleRoutes.get('/create', redirectIfAuthenticated, Articles.blogCreate)
articleRoutes.post('/create', Articles.blogCreatePost)

articleRoutes.get('/:slug', Articles.blogItem)
articleRoutes.get('/:slug/edit', doesHavePermissionToEdit, Articles.blogItemUpdate)
articleRoutes.post('/:slug/edit', Articles.blogItemUpdatePost)
articleRoutes.post('/:slug/delete', Articles.blogItemDelete)

export default articleRoutes
