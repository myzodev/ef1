import express from 'express'
import Articles from '../controllers/articles-controller.js'
import { checkUserLoggedIn } from '../middlewares/auth-middleware.js'
import { checkPermissionsToEditArticle, checkPermissionsToDeleteArticle } from '../middlewares/article-middleware.js'
import fileUpload from '../utils/file-upload.js'

const articleRoutes = express.Router()

articleRoutes.get('/', Articles.index)

articleRoutes.get('/create', checkUserLoggedIn, Articles.articleCreate)
articleRoutes.post('/create', [checkUserLoggedIn, fileUpload.single('image')], Articles.articleCreatePost)

articleRoutes.get('/:slug/:id', Articles.articleItem)
articleRoutes.get('/:slug/:id/edit', [checkUserLoggedIn, checkPermissionsToEditArticle], Articles.articleItemEdit)
articleRoutes.post('/:slug/:id/edit', [checkUserLoggedIn, checkPermissionsToEditArticle, fileUpload.single('image')], Articles.articleItemEditPost)
articleRoutes.post('/:slug/:id/delete', [checkUserLoggedIn, checkPermissionsToDeleteArticle], Articles.articleItemDeletePost)

export default articleRoutes
