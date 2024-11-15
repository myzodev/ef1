import User from '../models/user-model.js'
import { checkRequiredFields, generateResponse } from '../utils/auth.js'

class Users {
	static register = async (user) => {
		try {
			const areCredentialsValid = checkRequiredFields(user, ['name', 'email', 'password', 'repeatPassword'])

			if (user.password !== user.repeatPassword) {
				return generateResponse(true, 'Passwords do not match.', {})
			}

			if (!areCredentialsValid) {
				return generateResponse(true, 'Please provide all fields.', {})
			}

			const foundUser = await User.find({ email: user.email })

			if (foundUser) {
				return generateResponse(true, 'User already exists', {})
			}

			const newUserPassword = await User.hashPassword(user.password)

			const newUserCredentials = {
				...user,
				password: newUserPassword,
			}

			const newUser = await User.create(newUserCredentials)

			return generateResponse(false, 'User created', newUser)
		} catch (error) {
			console.error(error.message)
		}
	}

	static login = async (user) => {
		try {
			const areCredentialsValid = checkRequiredFields(user, ['email', 'password'])

			if (!areCredentialsValid) {
				return generateResponse(true, 'Please provide all fields.', {})
			}

			const foundUser = await User.find({ email: user.email })

			if (!foundUser) {
				return generateResponse(true, 'User does not exist', {})
			}

			const isPasswordvalid = await User.comparePasswords(user.password, foundUser.password)

			if (!isPasswordvalid) {
				return generateResponse(true, 'Invalid credentials', {})
			}

			return generateResponse(false, 'User logged in', foundUser)
		} catch (error) {
			console.error(error.message)
		}
	}
}

export default Users
