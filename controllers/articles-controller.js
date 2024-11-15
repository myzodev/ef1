import Article from '../models/article-model.js'

class Articles {
	static fetchArticles = async () => {
		try {
			const articles = await Article.getAll()

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
}

export default Articles
