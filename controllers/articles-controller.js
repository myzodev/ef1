import Article from '../models/article-model.js'

class Articles {
	static fetchArticles = async () => {
		try {
			const articles = await Article.getAll()
			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticlesAmount = async (amount) => {
		try {
			const articles = await Article.getAmount(amount)
			return articles
		} catch (error) {
			console.error(error.message)
		}
	}

	static fetchArticleBySlug = async (slug) => {
		try {
			const article = await Article.getBySlug(slug)
			return article
		} catch (error) {
			console.error(error.message)
		}
	}
}

export default Articles
