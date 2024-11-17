import User from '../models/user-model.js'

class Admin {
	static index = async (req, res) => {
        res.render('admin/admin', { activeNav: 'admin' })
    }

	static profile = async (req, res) => {
        res.render('admin/profile', { activeNav: 'admin' })
    }

    static profileEdit = async (req, res) => {
        let { name, email, password, repeatPassword } = req.body
        let avatar = null

        if (req.file) {
            avatar = `/uploads/${req.file.filename}`
        }

        if (password !== repeatPassword) {
            req.flash('error', 'Passwords do not match!')
            return res.redirect('/admin/profile')
        }

        if (password) {
            password = await User.hashPassword(password)
        }

        if (!name || !email) {
            req.flash('error', 'All fields are required!')
            return res.redirect('/admin/profile')
        }

        const updatedUser = await User.update({ name, email, password, avatar, id: req.session.user.id })

        delete updatedUser.password

        req.session.user = updatedUser
        req.flash('success', 'Profile updated successfully!')
        res.redirect('/admin/profile')
    }
}

export default Admin
