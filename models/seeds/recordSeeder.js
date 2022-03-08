const mongoose = require('mongoose')
const Record = require('../record')
const recordList = require('./seedsData/record.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('RecordSeeder is running!')
  for (let i = 0; i < recordList.results.length; i++) {
    Record.create(recordList.results[i])
      .then(() => {
        return db.close()
      })
  }
  console.log('Closed!')
})