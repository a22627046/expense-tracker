const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//定義首頁路由
router.get('/', (req, res) => {
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

module.exports = router