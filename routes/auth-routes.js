import express from 'express'

const authRouter = express.Router()

authRouter.get('/login', (req, res) => {
	res.render('login', { layout: 'layouts/auth' })
})

authRouter.get('/register', (req, res) => {
	res.render('register', { layout: 'layouts/auth' })
})

export default authRouter
