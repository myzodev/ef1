import Article from '../models/article-model.js'

export const checkPermissionsToEditArticle = async (req, res, next) => {
	const { slug } = req.params
	const currentUser = req.session.user

	const article = await Article.find({ slug })

	if (article.user_id === currentUser.id) return next()

	res.redirect('/blog')
}

export const checkPermissionsToDeleteArticle = async (req, res, next) => {
	const { slug } = req.params
	const currentUser = req.session.user

	const article = await Article.find({ slug })

    if (currentUser.is_admin) return next()
	if (article.user_id === currentUser.id) return next()

	res.redirect('/blog')
}
