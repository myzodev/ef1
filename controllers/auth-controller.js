import User from '../models/user-model.js'

class Auth {
	static register = (req, res) => {
		res.render('auth/register', { layout: 'layouts/auth' })
	}

	static registerPost = async (req, res) => {
		const user = req.body

		if (!user.name || !user.email || !user.password || !user.repeatPassword) {
            req.flash('error', 'All fields are required!')
            return res.redirect('back')
        }

		if (user.password !== user.repeatPassword) {
            req.flash('error', 'Passwords do not match!')
            return res.redirect('back')
        }

		const foundUser = await User.find({ email: user.email })

		if (foundUser) {
            req.flash('error', 'User already exists!')
            return res.redirect('back')
        }

		user.password = await User.hashPassword(user.password)

		const newUser = await User.create(user)

		delete newUser.password

		req.session.user = newUser
		req.flash('success', 'You have been registered successfully!')
		res.redirect('/')
	}

	static login = (req, res) => {
		res.render('auth/login', { layout: 'layouts/auth' })
	}

	static loginPost = async (req, res) => {
		const user = req.body

		if (!user.email || !user.password) {
            req.flash('error', 'Invalid email or password!')
            return res.redirect('back')
        }

		const foundUser = await User.find({ email: user.email })

		if (!foundUser) {
            req.flash('error', 'User not found!')
            return res.redirect('back')
        }

		const isPasswordValid = await User.comparePasswords(user.password, foundUser.password)

		if (!isPasswordValid) {
            req.flash('error', 'Invalid email or password!')
            return res.redirect('back')
        }

		delete foundUser.password

		req.session.user = foundUser
        req.flash('success', 'You have been logged in successfully!')
		res.redirect('/')
	}

	static logoutPost = (req, res) => {
		req.session.user = null
        req.flash('success', 'You have been logged out successfully!')
		res.redirect('/')
	}
}

export default Auth
