import db from '../database/db.js'
import { generateKeysValues, slugify } from '../utils/model.js'

class Article {
	static find = async (data = {}, amount) => {
		let query = `
            SELECT articles.*, users.name AS user_name, users.email AS user_email
            FROM articles INNER JOIN users ON articles.user_id = users.id
        `

		let queryParams = []

		if (!data || Object.keys(data).length === 0) {
			if (amount) {
				query += ` LIMIT ?`
				queryParams.push(amount)
			}

			const [articles] = await db.query(query, queryParams)
			return articles
		} else {
			query += 'WHERE '
		}

		const { keys, values } = generateKeysValues(data)

		// Build the WHERE clause dynamically
		query += keys.map((key) => `${key} = ?`).join(' AND ')
		queryParams.push(...values)

		// Add LIMIT if amount is provided
		if (amount) {
			query += ` LIMIT ?`
			queryParams.push(amount)
		}

		// Execute the query with parameters
		const [articles] = await db.query(query, queryParams)

		if (articles.length === 1) return articles[0]
		if (articles.length === 0) return []

		return articles
	}

	static create = async (article) => {
		article.slug = slugify(article.title)

		await db.query('INSERT INTO articles (user_id, title, slug, text, category, image) VALUES (?, ?, ?, ?, ?, ?)', [
			article.userID,
			article.title,
			article.slug,
			article.text,
			article.category,
			article.image,
		])

		return article
	}

	static update = async (article) => {
		article.slug = slugify(article.title)

		await db.query('UPDATE articles SET title = ?, slug = ?, text = ?, category = ?, image = ? WHERE id = ?', [
			article.title,
			article.slug,
			article.text,
			article.category,
			article.image,
			article.id,
		])

		return article
	}

	static findBySlugAndDelete = async (slug) => {
		await db.query('DELETE FROM articles WHERE slug = ?', [slug])
	}
}

export default Article
