const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const defaultRouter = require('./routes/default.routes')
const authRouter = require('./routes/auth.routes')
const newsRouter = require('./routes/news.routes')

const app = express()
const APP_PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layouts/default')

app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/news', newsRouter)

app.listen(APP_PORT, () => {
	console.log(`App listening on http://localhost:${APP_PORT}`)
})
