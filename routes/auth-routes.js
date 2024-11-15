import express from 'express'
import Users from '../controllers/users-controller.js'

const authRouter = express.Router()

authRouter.get('/register', (req, res) => {
    req.session.message = ''
	res.render('register', { layout: 'layouts/auth' })
})

authRouter.post('/register', async (req, res) => {
    const { name, email, password, repeatPassword } = req.body
    const { error, message, data } = await Users.register({ name, email, password, repeatPassword })

    if (error) {
        req.session.message = message
        res.redirect('/auth/register')
        return
    }

    req.session.user = data
    res.redirect('/')
})

authRouter.get('/login', (req, res) => {
    req.session.message = ''
	res.render('login', { layout: 'layouts/auth' })
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { error, message, data } = await Users.login({ email, password })

    if (error) {
        req.session.message = message
        res.redirect('/auth/login')
        return
    }

    req.session.user = data
    res.redirect('/')
})

authRouter.post('/logout', (req, res) => {
    req.session.user = null
    res.redirect('/')
})

export default authRouter
