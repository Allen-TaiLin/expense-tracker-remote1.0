// 載入套件
const db = require('../../config/mongoose')
// 載入 Category model
const Category = require('../category')
// 範本資料
const categoryList = require('../../category.json')

// 新增種子資料
db.once('open', () => {
  for (let i = 0; i < categoryList.length; i++) {
    Category.create({
      category: categoryList[i].categoryList,
      icon: categoryList[i].icon,
      orderByID: categoryList[i].orderByID
    })
  }

  // 資料建立成功
  console.log('Category Data Insert Done')
})