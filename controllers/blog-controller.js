import db from '../database/db.js'

const getArticles = async () => {
    const [articles] = await db.query('SELECT * FROM articles')
    return articles
}

const getArticleByID = async (id) => {
    const [article] = await db.query('SELECT * FROM articles WHERE id = ?', [id])
    return article[0]
}

const getArticlesAmount = async (amount) => {
    const [article] = await db.query('SELECT * FROM articles LIMIT ?', [amount])
    return article
}

export { 
    getArticles,
    getArticleByID,
    getArticlesAmount
}