const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
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
      const newTime = moment(time).format('YYYY/MM/DD')
      return newTime
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

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



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})