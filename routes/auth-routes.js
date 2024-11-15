import express from 'express'
import Users from '../controllers/users-controller.js'
import { redirectIfAuthenticated } from '../middlewares/user-middleware.js'

const authRouter = express.Router()

/**
 * Register routes
 */
authRouter.get('/register', redirectIfAuthenticated, (req, res) => {
	req.session.message = ''
	res.render('register', { layout: 'layouts/auth' })
})

authRouter.post('/register', redirectIfAuthenticated, async (req, res) => {
	const { name, email, password, repeatPassword } = req.body
	const { error, message, data: user } = await Users.register({ name, email, password, repeatPassword })

	if (error) {
		req.session.message = message
		res.redirect('/auth/register')
		return
	}

	delete user.password

	req.session.user = user
	res.redirect('/')
})

/**
 * Login routes
 */
authRouter.get('/login', redirectIfAuthenticated, (req, res) => {
	req.session.message = ''
	res.render('login', { layout: 'layouts/auth' })
})

authRouter.post('/login', redirectIfAuthenticated, async (req, res) => {
	const { email, password } = req.body
	const { error, message, data: user } = await Users.login({ email, password })

	if (error) {
		req.session.message = message
		res.redirect('/auth/login')
		return
	}

	delete user.password

	req.session.user = user
	res.redirect('/')
})

/**
 * Logout route
 */
authRouter.post('/logout', redirectIfAuthenticated, (req, res) => {
	req.session.user = null
	res.redirect('/')
})

export default authRouter
