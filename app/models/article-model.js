import db from '../database/db.js'
import { generateKeysValues, slugify } from '../utils/model.js'

class Article {
	static find = async (data = {}, amount) => {
		let query = `
            SELECT articles.*, users.name AS user_name, users.email AS user_email, users.avatar AS user_avatar
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

		query += keys.map((key) => `articles.${key} = ?`).join(' AND ')
		queryParams.push(...values)

		if (amount) {
			query += ` LIMIT ?`
			queryParams.push(amount)
		}

		const [articles] = await db.query(query, queryParams)

		if (articles.length === 1) return articles[0]
		if (articles.length === 0) return []

		return articles
	}

	static create = async (article) => {
		article.slug = slugify(article.title)

		const [result] = await db.query('INSERT INTO articles (user_id, title, slug, text, category, image) VALUES (?, ?, ?, ?, ?, ?)', [
			article.userID,
			article.title,
			article.slug,
			article.text,
			article.category,
			article.image,
		])

		article.id = result.insertId

		return article
	}

	static update = async (article) => {
        const fields = [];
        const values = [];

        if (article.title) {
            article.slug = slugify(article.title);
            fields.push('title = ?');
            fields.push('slug = ?');
            values.push(article.title);
            values.push(article.slug);
        }

        if (article.text) {
            fields.push('text = ?');
            values.push(article.text);
        }

        if (article.category) {
            fields.push('category = ?');
            values.push(article.category);
        }

        if (article.image) {
            fields.push('image = ?');
            values.push(article.image);
        }

        values.push(article.id);

        const query = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;

        await db.query(query, values);

        return article;
    }

	static findByIDAndDelete = async (id) => {
        await db.query('DELETE FROM comments WHERE article_id = ?', [id])
		await db.query('DELETE FROM articles WHERE id = ?', [id])
	}
}

export default Article
