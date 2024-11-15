import db from '../database/db.js'
import { generateKeysValues } from '../utils/model.js'

class Article {
    static find = async (data = {}, amount) => {
        let query = 'SELECT * FROM articles'

        if (!data || Object.keys(data).length === 0) {
            const [articles] = await db.query(query)
            return articles
        } else {
            query = 'SELECT * FROM articles WHERE '
        }

        const { keys, values } = generateKeysValues(data)

        query += keys.map((key, index) => `${key} = '${values[index]}'`).join(' AND ')

        if (amount) query += ` LIMIT ${amount}`

        const [articles] = await db.query(query)

        if (articles.length == 1) return articles[0]

        return artciles
	}

    static findByIdAndDelete = async (id) => {
		await db.query('DELETE FROM articles WHERE id = ?', [id])
	}

	static create = async (article) => {
		await db.query('INSERT INTO articles (user_id, title, slug, text, category, image) VALUES (?, ?, ?, ?, ?, ?)', [
			article.userID,
			article.title,
			article.slug,
			article.text,
			article.category,
			article.image,
		])
	}
}

export default Article
