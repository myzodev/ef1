import db from '../database/db.js'

export const getAllArticles = async () => {
	const [articles] = await db.query('SELECT * FROM articles')
	return articles
}

export const getArticleByID = async (id) => {
	const [article] = await db.query('SELECT * FROM articles WHERE id = ?', [id])
	return article[0]
}

export const getArticlesAmount = async (amount) => {
	const [articles] = await db.query('SELECT * FROM articles LIMIT ?', [amount])
	return articles
}
