import db from '../database/db.js'
import User from './user-model.js'
import { generateKeysValues } from '../utils/model.js'

class Comment {
	static find = async (data = {}, amount) => {
		let query = `
            SELECT comments.*, users.name AS user_name, users.email AS user_email, users.avatar AS user_avatar
            FROM comments INNER JOIN users ON comments.user_id = users.id
        `

		let queryParams = []

		if (!data || Object.keys(data).length === 0) {
			if (amount) {
				query += ` LIMIT ?`
				queryParams.push(amount)
			}

			const [comments] = await db.query(query, queryParams)
			return comments
		} else {
			query += 'WHERE '
		}

		const { keys, values } = generateKeysValues(data)

		query += keys.map((key) => `comments.${key} = ?`).join(' AND ')
		queryParams.push(...values)

		if (amount) {
			query += ` LIMIT ?`
			queryParams.push(amount)
		}

		const [comments] = await db.query(query, queryParams)

		if (comments.length === 0) return []

		return comments
	}

	static create = async (comment) => {
        const [result] = await db.query(
            'INSERT INTO comments (user_id, article_id, text) VALUES (?, ?, ?)',
            [
                comment.userID,
                comment.articleID,
                comment.text,
            ]
        );

        const createdBy = await User.find({ id: comment.userID })

        delete comment.userID

        return {
            id: result.insertId,
            ...comment,
            user: { ...createdBy }
        };
    };


	static findByIDAndDelete = async (id) => {
        await db.query('DELETE FROM comments WHERE id = ?', [id])
    }
}

export default Comment
