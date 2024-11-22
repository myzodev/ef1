import Comment from "../models/comment-model.js"

class Comments {
	static commentCreatePost = async (req, res) => {
		const { articleID, text } = req.body
        const userID = req.session.user.id

        if (!userID || !articleID || !text) {
            req.flash('error', 'Please fill in all fields')
            return res.redirect('back')
        }

        await Comment.create({ userID, articleID, text })

        req.flash('success', 'Comment created successfully')
        res.redirect('back')
	}

	static commentItemDeletePost = async (req, res) => {
		const { id } = req.params

        await Comment.findByIDAndDelete(id)

        req.flash('success', 'Comment deleted successfully')
        res.redirect('back')
	}
}

export default Comments
