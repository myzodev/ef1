import Article from '../models/article-model.js'

class Articles {
    static index = async (req, res) => {
        const articles = await Article.find()
	    res.render('blog', { activeNav: 'blog', articles })
    }

    static blogCreate = async (req, res) => {
        res.render('blog-form', { activeNav: 'blog-item', article: null })
    }

    static blogCreatePost = async (req, res) => {
        const { title, text, category } = req.body
        const image = `/uploads/${req.file.originalname}`

        if (!title || !text || !category || !image) return

        const userID = req.session.user.id
        const newArticle = await Article.create({ userID, title, text, category, image })

        res.redirect(`/blog/${newArticle.slug}`)
    }

    static blogItem = async (req, res) => {
        const { slug } = req.params
        const article = await Article.find({ slug })

        res.render('blog-item', { activeNav: 'blog-item', article })
    }

    static blogItemEdit = async (req, res) => {
        const { slug } = req.params
        const article = await Article.find({ slug })

        res.render('blog-form', { activeNav: 'blog-item', article })
    }

    static blogItemEditPost = async (req, res) => {
        const { id, title, text, category } = req.body
        let image

        if (req.file) {
            image = `/uploads/${req.file.originalname}`
        } else {
            const article = await Article.find({ id })
            image = article.image
        }

        if (!id || !title || !text || !category || !image) return

        const updateArticle = await Article.update({ id, title, text, category, image })

        res.redirect(`/blog/${updateArticle.slug}`)
    }

    static blogItemDelete = async (req, res) => {
        const { slug } = req.params

        await Article.findBySlugAndDelete(slug)

        res.redirect('/blog')
    }
}

export default Articles
