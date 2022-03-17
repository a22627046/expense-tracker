const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const moment = require('moment')
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes')
const app = express()



app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    simplifyTime: function (time) {
      const newTime = moment(time).format('YYYY-MM-DD')
      return newTime
    },
    eq: function (v1, v2) {
      return v1 === v2
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})