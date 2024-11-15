import bcrypt from 'bcrypt'
import db from '../database/db.js'

class User {
    static getByEmail = async (email) => {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        return user[0]
    }

	static create = async (user) => {
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
        const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        return newUser[0];
    }

    static hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(8);
        return await bcrypt.hash(password, salt)
    }

    static comparePasswords = async (password, hash) => {
        return await bcrypt.compare(password, hash)
    }
}

export default User