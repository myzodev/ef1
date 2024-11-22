import User from '../models/user-model.js'

class Admin {
	static index = async (req, res) => {
        res.render('admin/admin', { activeNav: 'admin' })
    }

	static profileEdit = async (req, res) => {
        res.render('admin/profile', { activeNav: 'admin' })
    }

    static profileEditPost = async (req, res) => {
        try {
            let { name, email, password, repeatPassword } = req.body
            let avatar = null

            if (req.file) {
                avatar = `/uploads/${req.file.filename}`
            }

            if (!name || !email) {
                req.flash('error', 'All fields are required!')
                return res.redirect('back')
            }

            if (password !== repeatPassword) {
                req.flash('error', 'Passwords do not match!')
                return res.redirect('back')
            }

            if (password) {
                password = await User.hashPassword(password)
            }

            const updatedUser = await User.update({ name, email, password, avatar, id: req.session.user.id })

            delete updatedUser.password

            req.session.user = updatedUser
            req.flash('success', 'Profile updated successfully!')
            res.redirect('back')
        } catch (error) {
            console.error('Error updating profile:', error)
            req.flash('error', 'An error occurred while updating the profile. Please try again.')
            res.redirect('back')
        }
    }

    static profileUsers = async (req, res) => {
        try {
            const users = await User.find()
            res.render('admin/users', { activeNav: 'admin', users })
        } catch (error) {
            console.error('Error fetching users:', error)
            req.flash('error', 'An error occurred while fetching users. Please try again.')
            res.redirect('back')
        }
    }

    static profileUsersDeletePost = async (req, res) => {
        try {
            const { id } = req.params

            await User.findByIDAndDelete(id)
            req.flash('success', 'User deleted successfully!')
            res.redirect('back')
        } catch (error) {
            console.error('Error deleting user:', error)
            req.flash('error', 'An error occurred while deleting the user. Please try again.')
            res.redirect('back')
        }
    }
}

export default Admin
