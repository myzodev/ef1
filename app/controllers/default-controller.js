import Article from '../models/article-model.js'

class Default {
    static index = async (req, res) => {
        try {
            const articles = await Article.find({}, 7)
            res.render('index', { activeNav: 'home', newestArticle: articles[0], articles: articles.slice(1, 7) })
        } catch (error) {
            console.log(error)
        }
    }

    static drivers = (req, res) => {
        res.render('drivers', { activeNav: 'drivers' })
    }

    static teams = (req, res) => {
        res.render('teams', { activeNav: 'teams' })
    }
}

export default Default