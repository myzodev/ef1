import Article from '../models/article-model.js'

export const doesHavePermissionToEdit = async (req, res, next) => {
	const { slug } = req.params
	const currentUser = req.session.user

	const article = await Article.find({ slug })

	if (article.user_id === currentUser.id) {
		return next()
	}

	return res.redirect('/blog')
}
