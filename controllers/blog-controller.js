import { getAllArticles, getArticleByID, getArticlesAmount } from '../models/blog-model.js'

export const fetchArticles = async () => {
	try {
		const articles = await getAllArticles()
		return articles
	} catch (error) {
		console.error(error.message)
	}
}

export const fetchArticleByID = async (id) => {
	try {
		const article = await getArticleByID(id)
		return article
	} catch (error) {
		console.error(error.message)
	}
}

export const fetchArticlesAmount = async (amount) => {
	try {
		const articles = await getArticlesAmount(amount)
		return articles
	} catch (error) {
		console.error(error.message)
	}
}
