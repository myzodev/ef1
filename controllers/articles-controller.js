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
		const { id, slug } = await Article.create({ userID, title, text, category, image })

		res.redirect(`/blog/${slug}/${id}`)
	}

	static blogItem = async (req, res) => {
		const { slug, id } = req.params
		const article = await Article.find({ slug, id })

        if (article.length === 0) {
            return res.status(404).render('errors/404', { activeNav: '404' })
        }

		res.render('blog-item', { activeNav: 'blog-item', article })
	}

	static blogItemEdit = async (req, res) => {
		const { slug, id } = req.params
		const article = await Article.find({ slug, id })

		res.render('blog-form', { activeNav: 'blog-item', article })
	}

	static blogItemEditPost = async (req, res) => {
		const { id } = req.params
		const { title, text, category } = req.body
		let image

		if (req.file) {
			image = `/uploads/${req.file.originalname}`
		} else {
			const article = await Article.find({ id })
			image = article.image
		}

		if (!title || !text || !category || !image) return

		const { slug } = await Article.update({ id, title, text, category, image })

		res.redirect(`/blog/${slug}/${id}`)
	}

	static blogItemDelete = async (req, res) => {
		const { slug } = req.params

		await Article.findBySlugAndDelete(slug)

		res.redirect('/blog')
	}
}

export default Articles
