import express from 'express'
import Comments from '../controllers/comment-controller.js'
import { checkUserLoggedIn } from '../middlewares/auth-middleware.js'
import { checkPermissionsToDeleteComment } from '../middlewares/comment-middleware.js'

const commentRoutes = express.Router()

commentRoutes.post('/create', [checkUserLoggedIn], Comments.commentCreatePost)
commentRoutes.post('/:id/delete', [checkUserLoggedIn, checkPermissionsToDeleteComment], Comments.commentItemDeletePost)

export default commentRoutes
