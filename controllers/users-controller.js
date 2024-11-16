import User from '../models/user-model.js'

class Users {
	static userRegister = (req, res) => {
		req.session.message = ''
		res.render('register', { layout: 'layouts/auth' })
	}

	static userRegisterPost = async (req, res) => {
		const user = req.body

		if (!user.name || !user.email || !user.password || !user.repeatPassword) return

		if (user.password !== user.repeatPassword) return

		const foundUser = await User.find({ email: user.email })

		if (foundUser) return

		user.password = await User.hashPassword(user.password)

		const newUser = await User.create(user)

		delete newUser.password

		req.session.user = newUser
		res.redirect('/')
	}

	static userLogin = (req, res) => {
		req.session.message = ''
		res.render('login', { layout: 'layouts/auth' })
	}

	static userLoginPost = async (req, res) => {
		const user = req.body

		if (!user.email || !user.password) return

		const foundUser = await User.find({ email: user.email })

		if (!foundUser) return

		const isPasswordValid = await User.comparePasswords(user.password, foundUser.password)

		if (!isPasswordValid) return

		delete foundUser.password

		req.session.user = foundUser
		res.redirect('/')
	}

	static userLogout = (req, res) => {
		req.session.user = null
		res.redirect('/')
	}
}

export default Users
