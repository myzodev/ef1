import Article from "../models/article-model.js"

export const doesHavePermissionToDelete = async (req, res, next) => {
    const { id } = req.params
    const isUserLoggedIn = req.session.user

    if (isUserLoggedIn.is_admin) {
        return next()
    }

    const article = await Article.find({ id })

    if (article.user_id === isUserLoggedIn.id) {
        return next()
    }

    return
}
