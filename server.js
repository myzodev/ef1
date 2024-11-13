const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const defaultRouter = require('./routes/default-routes')
const authRouter = require('./routes/auth-routes')
const blogRouter = require('./routes/blog-routes')

const app = express()
const APP_PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('dist'))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layouts/default')

app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/blog', blogRouter)

app.listen(APP_PORT, () => {
	console.log(`App listening on http://localhost:${APP_PORT}`)
})
