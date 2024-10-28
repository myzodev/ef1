const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const app = express()

const APP_PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ ectended: false }))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
	res.render('index', { layout: 'layouts/default' })
})

app.get('/news', (req, res) => {
	res.render('news', { layout: 'layouts/default' })
})

app.get('/news-item', (req, res) => {
	res.render('news-item', { layout: 'layouts/default' })
})

app.get('/drivers', (req, res) => {
	res.render('drivers', { layout: 'layouts/default' })
})

app.get('/teams', (req, res) => {
	res.render('teams', { layout: 'layouts/default' })
})

app.get('/login', (req, res) => {
	res.render('login', { layout: 'layouts/auth' })
})

app.get('/register', (req, res) => {
	res.render('register', { layout: 'layouts/auth' })
})

app.listen(APP_PORT, () => {
	console.log(`App listening on port ${APP_PORT}`)
})
