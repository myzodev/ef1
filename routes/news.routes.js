const express = require('express')

const newsRouter = express.Router()

newsRouter.get('/', (req, res) => {
	res.render('news')
})

newsRouter.get('/:id', (req, res) => {
	res.render('news-item')
})

module.exports = newsRouter
