import Comment from "../models/comment-model.js"

export const checkPermissionsToDeleteComment = async (req, res, next) => {
	const { id } = req.params
	const currentUser = req.session.user

	const comment = await Comment.find({ id })

    if (currentUser.is_admin) return next()
	if (comment[0].user_id === currentUser.id) return next()

	req.flash('error', 'You do not have permission to delete this comment!')
    res.redirect('back')
}
