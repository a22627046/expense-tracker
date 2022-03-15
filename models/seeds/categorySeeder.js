const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('./seedsData/category.json')

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