import express from 'express'
import { fetchArticles, fetchArticleByID } from '../controllers/blog-controller.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const articles = await fetchArticles()
	res.render('blog', { activeNav: 'blog', articles })
})

blogRouter.get('/:id', async (req, res) => {
	const { id } = req.params
	const article = await fetchArticleByID(id)
	res.render('blog-item', { activeNav: 'blog-item', article })
})

export default blogRouter
