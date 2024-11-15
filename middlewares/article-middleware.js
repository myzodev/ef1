import Article from "../models/article-model.js"

export const doesHavePermissionToEdit = async (req, res, next) => {
    const { id } = req.params
    const currentUser = req.session.user

    const article = await Article.find({ id })

    if (article.user_id === currentUser.id) {
        return next()
    }

    return res.redirect('/blog')
}

export const doesHavePermissionToDelete = async (req, res, next) => {
    const { id } = req.params
    const currentUser = req.session.user

    if (currentUser.is_admin) {
        return next()
    }

    const article = await Article.find({ id })

    if (article.user_id === currentUser.id) {
        return next()
    }

    return res.redirect('/blog')
}