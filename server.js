if (process.env.NOVE_ENV !== 'production') {
    require('dotenv').config()
}

// Include the dependencies
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const app = express()
const HTTP_port = 8050

// Include the routes
const indexRouter = require('./routes/index')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const userMainRouter = require('./routes/user-main')
const logoutRouter = require('./routes/logout')

// View engien set
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Use dependencies
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Use routes
app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/user-main', userMainRouter)
app.use('/logout', logoutRouter)

app.listen(HTTP_port, () => console.log(chalk.cyan(`Server running on port ${HTTP_port}`)) )