const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const moment = require('moment')
const methodOverride = require('method-override')
const Record = require('./models/record')
const mongoose = require('mongoose')

const app = express()

//設定連線到 mongoDB
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
//取得連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

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
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  const sum = (records) => {
    let total = 0
    records.map(record => {
      total += record.amount
    })
    return total
  }
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmount = sum(records)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.error(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})