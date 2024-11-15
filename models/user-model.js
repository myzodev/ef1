import bcrypt from 'bcrypt'
import db from '../database/db.js'
import { generateKeysValues } from '../utils/model.js'

class User {
	static find = async (data = {}, amount) => {
        let query = 'SELECT * FROM users'

        if (!data || Object.keys(data).length === 0) {
            const [articles] = await db.query(query)
            return articles
        } else {
            query = 'SELECT * FROM users WHERE '
        }

        const { keys, values } = generateKeysValues(data)

        query += keys.map((key, index) => `${key} = '${values[index]}'`).join(' AND ')

        if (amount) query += ` LIMIT ${amount}`

        const [users] = await db.query(query)

        if (users.length == 1) return users[0]
        if (users.length == 0) return null

        return users
	}

	static create = async (user) => {
        user.is_admin = user.is_admin ? 1 : 0

		const [result] = await db.query('INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)', [...Object.values(user)])
		const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId])
        
		return newUser[0]
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
