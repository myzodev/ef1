import Article from '../models/article-model.js'

export const checkPermissionsToEditArticle = async (req, res, next) => {
	const { slug } = req.params
	const currentUser = req.session.user

	const article = await Article.find({ slug })

	if (article.user_id === currentUser.id) return next()

	req.flash('error', 'You do not have permission to edit this article!')
    res.redirect('back')
}

export const checkPermissionsToDeleteArticle = async (req, res, next) => {
	const { slug } = req.params
	const currentUser = req.session.user

	const article = await Article.find({ slug })

    if (currentUser.is_admin) return next()
	if (article.user_id === currentUser.id) return next()

	req.flash('error', 'You do not have permission to delete this article!')
    res.redirect('back')
}
