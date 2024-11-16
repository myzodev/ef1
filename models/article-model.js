import db from '../database/db.js'
import { generateKeysValues, slugify } from '../utils/model.js'

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
        if (articles.length == 0) return []

        return artciles
	}

	static create = async (article) => {
        article.slug = slugify(article.title)
        
		await db.query('INSERT INTO articles (user_id, title, slug, text, category, image) VALUES (?, ?, ?, ?, ?, ?)', [
            article.userID,
            article.title,
            article.slug,
            article.text,
            article.category,
            article.image
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
            article.id
        ])

        return article
	}

    static findBySlugAndDelete = async (slug) => {
		await db.query('DELETE FROM articles WHERE slug = ?', [slug])
	}
}

export default Article
