const express = require('express')
const articles = require('../database')

const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {
	res.render('blog', { activeNav: 'blog', articles })
})

blogRouter.get('/:id', (req, res) => {
    const article = articles.find(article => article.id == req.params.id)
	res.render('blog-item', { activeNav: 'blog-item', article })
})

module.exports = blogRouter
