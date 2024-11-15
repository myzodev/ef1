import express from 'express'
import Articles from '../controllers/articles-controller.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const articles = await Articles.fetchArticles()
	res.render('blog', { activeNav: 'blog', articles })
})

blogRouter.get('/:slug', async (req, res) => {
	const { slug } = req.params
	const article = await Articles.fetchArticleBySlug(slug)
	res.render('blog-item', { activeNav: 'blog-item', article })
})

export default blogRouter
