import bcrypt from 'bcrypt'
import db from '../database/db.js'
import { generateKeysValues } from '../utils/model.js'

class User {
	static find = async (data = {}, amount) => {
		let query = 'SELECT * FROM users'
		let queryParams = []

		if (!data || Object.keys(data).length === 0) {
			if (amount) {
				query += ` LIMIT ?`
				queryParams.push(amount)
			}

			const [users] = await db.query(query, queryParams)
			return users
		} else {
			query += ' WHERE '
		}

		const { keys, values } = generateKeysValues(data)

		query += keys.map((key) => `users.${key} = ?`).join(' AND ')
		queryParams.push(...values)

		if (amount) {
			query += ` LIMIT ?`
			queryParams.push(amount)
		}

		const [users] = await db.query(query, queryParams)

		if (users.length === 1) return users[0]
		if (users.length === 0) return null

		return users
	}

	static create = async (user) => {
		user.is_admin = user.is_admin ? 1 : 0

		const [result] = await db.query('INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)', [
			user.name,
			user.email,
			user.password,
			user.is_admin,
		])

		const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId])

		return newUser[0]
	}

    static update = async (user) => {
		const fields = []
        const values = []

        if (user.name) {
            fields.push('name = ?')
            values.push(user.name)
        }

        if (user.email) {
            fields.push('email = ?')
            values.push(user.email)
        }

        if (user.avatar) {
            fields.push('avatar = ?')
            values.push(user.avatar)
        }
        
        if (user.password) {
            fields.push('password = ?')
            values.push(user.password)
        }

        values.push(user.id)

        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`

        await db.query(query, values)

        const [updatedUser] = await db.query('SELECT * FROM users WHERE id = ?', [user.id])

		return updatedUser[0]
	}

    static findByIDAndDelete = async (id) => {
        await db.query('DELETE FROM comments WHERE user_id = ?', [id])
        await db.query('DELETE FROM articles WHERE user_id = ?', [id])
        await db.query('DELETE FROM users WHERE id = ?', [id])
    }

	static hashPassword = async (password) => {
		const salt = await bcrypt.genSalt(8)
		return await bcrypt.hash(password, salt)
	}

	static comparePasswords = async (password, hash) => {
		return await bcrypt.compare(password, hash)
	}
}

export default User
