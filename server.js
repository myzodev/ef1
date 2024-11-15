import express from 'express'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import defaultRouter from './routes/default-routes.js'
import authRouter from './routes/auth-routes.js'
import blogRouter from './routes/blog-routes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const APP_PORT = process.env.APP_PORT || 3000

/**
 * Session store configuration
 */
const MySQLStoreFunction = MySQLStore(session);

const sessionOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
}

const sessionStore = new MySQLStoreFunction(sessionOptions)

app.use(
    session({
        secret: process.env.APP_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
)

/**
 * Middleware to pass data to all views
 */
app.use((req, res, next) => {
    const user = req.session.user
    res.locals.user = user

    const message = req.session.message
    res.locals.message = message
    
    next()
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join(__dirname, 'views/layouts/default'))

/**
 * Routes
 */
app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/blog', blogRouter)

app.use((req, res) => {
    res.status(404).render("errors/404", { activeNav: '404' });
});

app.listen(APP_PORT, () => {
	console.log(`App listening on http://localhost:${APP_PORT}`)
})
