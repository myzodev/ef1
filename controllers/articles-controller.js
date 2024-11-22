import Article from '../models/article-model.js'
import Comment from '../models/comment-model.js'

class Articles {
    static index = async (req, res) => {
        try {
            const articles = await Article.find()
            res.render('blog/blog', { activeNav: 'blog', articles })
        } catch (error) {
            console.error('Error fetching articles:', error)
            req.flash('error', 'An error occurred while fetching articles. Please try again.')
            res.redirect('back')
        }
    }

    static articleCreate = async (req, res) => {
        res.render('blog/blog-form', { activeNav: 'blog-item', article: null })
    }

    static articleCreatePost = async (req, res) => {
        try {
            const { title, text, category } = req.body
            const image = `/uploads/${req.file?.filename}`

            if (!title || !text || !category || !image) {
                req.flash('error', 'All fields are required!')
                return res.redirect('back')
            }

            const userID = req.session.user.id
            const { id, slug } = await Article.create({ userID, title, text, category, image })

            req.flash('success', 'Article has been created successfully!')
            res.redirect(`/blog/${slug}/${id}`)
        } catch (error) {
            console.error('Error creating article:', error)
            req.flash('error', 'An error occurred while creating the article. Please try again.')
            res.redirect('back')
        }
    }

    static articleItem = async (req, res) => {
        try {
            const { slug, id } = req.params
            const article = await Article.find({ slug, id })
    
            if (article.length === 0) {
                return res.status(404).render('errors/404', { activeNav: '404' })
            }
    
            const comments = await Comment.find({ article_id: article.id })
    
            res.render('blog/blog-item', { activeNav: 'blog-item', article, comments })
        } catch (error) {
            console.error('Error getting article:', error)
            req.flash('error', 'An error occurred while getting the article. Please try again.')
            res.redirect('back')            
        }
    }

    static articleItemEdit = async (req, res) => {
        try {
            const { id } = req.params
            const article = await Article.find({ id })
            res.render('blog/blog-form', { activeNav: 'blog-item', article })
        } catch (error) {
            console.error('Error rendering article:', error)
            req.flash('error', 'An error occurred while rendering the article. Please try again.')
            res.redirect('back')            
        }
    }

    static articleItemEditPost = async (req, res) => {
        try {
            const { slug, id } = req.params
            const { title, text, category } = req.body
            let image
    
            if (req.file) {
                image = `/uploads/${req.file.filename}`
            } else {
                const article = await Article.find({ id })
                image = article.image
            }
    
            if (!title || !text || !category || !image) {
                req.flash('error', 'All fields are required!')
                return res.redirect(`/blog/${slug}/${id}/edit`)
            }
    
            const { slug: newSlug } = await Article.update({ id, title, text, category, image })
    
            req.flash('success', 'Article has been updated successfully!')
            res.redirect(`/blog/${newSlug}/${id}`)
        } catch (error) {
            console.error('Error updating article:', error)
            req.flash('error', 'An error occurred while updating the article. Please try again.')
            res.redirect('back')
        }
    }

    static articleItemDeletePost = async (req, res) => {
        try {
            const { id } = req.params
    
            await Article.findByIDAndDelete(id)
    
            req.flash('success', 'Article has been deleted successfully!')
            res.redirect('/blog')
        } catch (error) {
            console.error('Error deleting article:', error)
            req.flash('error', 'An error occurred while deleting the article. Please try again.')
            res.redirect('back')             
        }
    }
}

export default Articles
