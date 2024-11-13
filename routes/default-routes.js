const express = require('express')
const articles = require('../database')

const defaultRouter = express.Router()

defaultRouter.get('/', (req, res) => {
	res.render('index', { activeNav: 'home', newestArticle: articles[0], articles: articles.slice(1, 7) })
})

defaultRouter.get('/drivers', (req, res) => {
	res.render('drivers', { activeNav: 'drivers' })
})

defaultRouter.get('/teams', (req, res) => {
	res.render('teams', { activeNav: 'teams' })
})

module.exports = defaultRouter
