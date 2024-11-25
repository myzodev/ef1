import Comment from "../models/comment-model.js"

class Comments {
	static commentCreatePost = async (req, res) => {
        try {
            const { articleID, text } = req.body
    
            if (!articleID || !text) {
                req.flash('error', 'Please fill in all fields')
                return res.redirect('back')
            }
    
            await Comment.create({ userID: req.session.user.id, articleID, text })
    
            req.flash('success', 'Comment created successfully')
            res.redirect('back')
        } catch (error) {
            console.error('Error creating comment:', error)
            req.flash('error', 'An error occurred while creating the comment. Please try again.')
            res.redirect('back')            
        }
	}

	static commentItemDeletePost = async (req, res) => {
        try {
            const { id } = req.params
    
            await Comment.findByIDAndDelete(id)
    
            req.flash('success', 'Comment deleted successfully')
            res.redirect('back')
        } catch (error) {
            console.error('Error deleting comment:', error)
            req.flash('error', 'An error occurred while deleting the comment. Please try again.')
            res.redirect('back')
        }
	}
}

export default Comments
