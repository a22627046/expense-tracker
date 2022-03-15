const db = require('../../config/mongoose')
const Record = require('../record')
const recordList = require('./seedsData/record.json')

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