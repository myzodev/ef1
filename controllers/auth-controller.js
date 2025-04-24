import User from '../models/user-model.js'

class Auth {
	static register = (req, res) => {
		res.render('auth/register', { layout: 'layouts/auth' })
	}

	static registerPost = async (req, res) => {
        try {
            const { name, email, password, repeatPassword } = req.body
    
            if (!name || !email || !password || !repeatPassword) {
                req.flash('error', 'All fields are required!')
                return res.redirect('back')
            }
    
            if (password !== repeatPassword) {
                req.flash('error', 'Passwords do not match!')
                return res.redirect('back')
            }
    
            const userExists = await User.find({ email })
    
            if (userExists) {
                req.flash('error', 'User already exists!')
                return res.redirect('back')
            }
    
            const hashedPassword = await User.hashPassword(password)
            const newUser = await User.create({ name, email, password: hashedPassword })
    
            delete newUser.password
    
            req.session.user = newUser
            req.flash('success', 'You have been registered successfully!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.error('Error registering user:', error)
            req.flash('error', 'An error occurred while registering the user. Please try again.')
            res.redirect('back')
        }
	}

	static login = (req, res) => {
		res.render('auth/login', { layout: 'layouts/auth' })
	}

	static loginPost = async (req, res) => {
        try {
            const { email, password } = req.body
    
            if (!email || !password) {
                req.flash('error', 'Invalid email or password!')
                return res.redirect('back')
            }
    
            const user = await User.find({ email })
    
            if (!user) {
                req.flash('error', 'User not found!')
                return res.redirect('back')
            }
    
            const isPasswordValid = await User.comparePasswords(password, user.password)
    
            if (!isPasswordValid) {
                req.flash('error', 'Invalid email or password!')
                return res.redirect('back')
            }
    
            delete user.password
    
            req.session.user = user
            req.flash('success', 'You have been logged in successfully!')
            
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.error('Error logging in user:', error)
            req.flash('error', 'An error occurred while logging in the user. Please try again.')
            res.redirect('back')            
        }
	}

	static logoutPost = (req, res) => {
		req.session.user = null
        req.flash('success', 'You have been logged out successfully!')
		req.session.save(() => {
            res.redirect('/')
        })
	}
}

export default Auth
