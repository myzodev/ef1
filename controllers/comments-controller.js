import Comment from "../models/comment-model.js"

class Comments {
	static commentCreatePost = async (req, res) => {
        try {
            const { articleID, text } = req.body
    
            if (!articleID || !text) {
                req.flash('error', 'Please fill in all fields')
                return res.redirect('back')
            }
    
            const newComment = await Comment.create({ userID: req.session.user.id, articleID, text })
    
            res.status(201).json(newComment)
        } catch (error) {
            console.error('Error creating comment:', error)
        }
	}

	static commentItemDeletePost = async (req, res) => {
        try {
            const { id } = req.params

            await Comment.findByIDAndDelete(id)

            res.status(200).json({ message: 'Comment deleted successfully' }) // actually sends the response
        } catch (error) {
            res.status(404).json({ error: 'Comment not found' })
        }
    }
}

export default Comments
