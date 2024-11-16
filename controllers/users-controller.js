import User from '../models/user-model.js'

class Users {
	static userRegister = (req, res) => {
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
		res.render('login', { layout: 'layouts/auth' })
	}

	static userLoginPost = async (req, res) => {
		const user = req.body

		if (!user.email || !user.password) {
            req.flash('error', 'Invalid email or password!')
            return res.redirect('/auth/login')
        }

		const foundUser = await User.find({ email: user.email })

		if (!foundUser) {
            req.flash('error', 'User not found!')
            return res.redirect('/auth/login')
        }

		const isPasswordValid = await User.comparePasswords(user.password, foundUser.password)

		if (!isPasswordValid) {
            req.flash('error', 'Invalid email or password!')
            return res.redirect('/auth/login')
        }

		delete foundUser.password

		req.session.user = foundUser
        req.flash('success', 'You have been logged in successfully!')
		res.redirect('/')
	}

	static userLogout = (req, res) => {
		req.session.user = null
        req.flash('success', 'You have been logged out successfully!')
		res.redirect('/')
	}
}

export default Users
