import express from 'express'
import Article from '../models/article-model.js'

const defaultRoutes = express.Router()

defaultRoutes.get('/', async (req, res) => {
	const articles = await Article.find({}, 7)
	res.render('index', { activeNav: 'home', newestArticle: articles[0], articles: articles.slice(1, 7) })
})

defaultRoutes.get('/drivers', (req, res) => {
	res.render('drivers', { activeNav: 'drivers' })
})

defaultRoutes.get('/teams', (req, res) => {
	res.render('teams', { activeNav: 'teams' })
})

export default defaultRoutes
