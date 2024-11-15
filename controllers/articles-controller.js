import Article from '../models/article-model.js'
import { checkRequiredFields, generateResponse, slugify } from '../utils/auth.js'

class Articles {
	static fetchArticles = async () => {
		try {
			const articles = await Article.find()

			if (!articles.length) return []

			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticlesAmount = async (amount) => {
		try {
			const articles = await Article.find({}, amount)

			if (!articles.length) return []

			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticleBySlug = async (slug) => {
		try {
			const article = await Article.find({ slug })

			if (!article) return null

			return article
		} catch (error) {
			console.error(error.message)
		}
	}

    static deleteArticleByID = async (id) => {
		try {
			await Article.findByIdAndDelete(id)
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
				...article,
				slug: slugify(article.title),
			}

			await Article.create(newArticle)
		} catch (error) {
			console.error(error.message)
		}
	}
}

export default Articles
