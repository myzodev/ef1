import db from '../database/db.js'

class Article {
	static getAll = async () => {
		const [articles] = await db.query('SELECT * FROM articles')
		return articles
	}

	static getAmount = async (amount) => {
		const [articles] = await db.query('SELECT * FROM articles LIMIT ?', [amount])
		return articles
	}

	static getBySlug = async (slug) => {
		const [article] = await db.query('SELECT * FROM articles WHERE slug = ?', [slug])
		return article[0]
	}
}

export default Article
