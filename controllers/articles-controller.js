import Article from '../models/article-model.js'
import { checkRequiredFields, generateResponse, slugify } from '../utils/auth.js'

class Articles {
	static fetchArticles = async () => {
		try {
			const articles = await Article.getAll()

            console.log(articles)

			if (!articles.length) return []

			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticlesAmount = async (amount) => {
		try {
			const articles = await Article.getAmount(amount)

			if (!articles.length) return []

			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticleBySlug = async (slug) => {
		try {
			const article = await Article.getBySlug(slug)

			if (!article) return null

			return article
		} catch (error) {
			console.error(error.message)
		}
	}

	static createNewArticle = async (article) => {
		try {
			const areFieldsValid = checkRequiredFields(article, ['title', 'text', 'category', 'image'])

			if (!areFieldsValid) {
				return generateResponse(true, 'Please provide all fields.', {})
			}

			const newArticle = {
				userID: article.userID,
				title: article.title,
				slug: slugify(article.title),
				text: article.text,
				category: article.category,
				image: article.image,
			}

			await Article.create(newArticle)
		} catch (error) {
			console.error(error.message)
		}
	}

	static deleteArticleByID = async (id) => {
		try {
			await Article.deleteByID(id)
		} catch (error) {
			console.error(error.message)
		}
	}
}

export default Articles
