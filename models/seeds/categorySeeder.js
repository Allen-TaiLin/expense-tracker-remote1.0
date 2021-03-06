// 載入套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
// 載入 Category model
const Category = require('../category')
// 範本資料
const categoryList = require('../../category.json')

// 新增種子資料
db.once('open', () => {
  console.log('MongoDB connected category!')

  const promise = []
  for (let i = 0; i < categoryList.length; i++) {
    promise.push(
      Category.create({
        category: categoryList[i].category,
        categoryName: categoryList[i].categoryName,
        url: categoryList[i].url,
        icon: categoryList[i].icon,
        tempCategory: categoryList[i].tempCategory
      })
    )

  }

  // 資料建立後，中斷連線換手
  Promise.all(promise).then(() => {
    db.close()
  })
  // 資料建立成功
  console.log('Category Data Insert Done')
})