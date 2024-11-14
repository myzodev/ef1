import express from 'express'
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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('dist'))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join(__dirname, 'views/layouts/default'))

app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/blog', blogRouter)

app.listen(APP_PORT, () => {
	console.log(`App listening on http://localhost:${APP_PORT}`)
})
