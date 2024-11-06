const express = require('express')

const defaultRouter = express.Router()

defaultRouter.get('/', (req, res) => {
	res.render('index')
})

defaultRouter.get('/drivers', (req, res) => {
	res.render('drivers')
})

defaultRouter.get('/teams', (req, res) => {
	res.render('teams')
})

module.exports = defaultRouter
