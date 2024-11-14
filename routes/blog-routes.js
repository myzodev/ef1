import express from 'express'
import { getArticles, getArticleByID } from '../controllers/blog-controller.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
    const articles = await getArticles()
	res.render('blog', { activeNav: 'blog', articles })
})

blogRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const article = await getArticleByID(id)
	res.render('blog-item', { activeNav: 'blog-item', article })
})

export default blogRouter
