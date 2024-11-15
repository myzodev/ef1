import express from 'express'
import Articles from '../controllers/articles-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'
import { doesHavePermissionToDelete } from '../middlewares/article-middleware.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const articles = await Articles.fetchArticles()
	res.render('blog', { activeNav: 'blog', articles })
})

blogRouter.get('/:slug', async (req, res, next) => {
	const { slug } = req.params
	const article = await Articles.fetchArticleBySlug(slug)

	if (!article) return next()

	res.render('blog-item', { activeNav: 'blog-item', article })
})

/**
 * Create routes
 */
blogRouter.get('/create', redirectIfAuthenticated, async (req, res) => {
	res.render('blog-create', { activeNav: 'blog-item' })
})

blogRouter.post('/create', redirectIfAuthenticated, async (req, res) => {
	const { title, text, category, image } = req.body

	const userID = req.session.user.id

	await Articles.createNewArticle({ userID, title, text, category, image })

	res.redirect('/blog')
})

/**
 * Delete route
 */
blogRouter.post('/delete/:id', doesHavePermissionToDelete, async (req, res) => {
	const { id } = req.params

	await Articles.deleteArticleByID(id)

	res.redirect('/blog')
})

export default blogRouter
