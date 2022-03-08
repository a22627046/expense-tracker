const mongoose = require('mongoose')
const Category = require('../category')
const categoryList = require('./seedsData/category.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('CategorySeeder is running!')
  for (let i = 0; i < categoryList.results.length; i++) {
    Category.create(categoryList.results[i])
      .then(() => {
        return db.close()
      })
  }
  console.log('Done!')
})