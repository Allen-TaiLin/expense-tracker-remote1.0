// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 model
const Record = require('../../models/record')
const Category = require('../../models/category')
// 自定義方法
const totalCalc = require('../../public/javascripts/totalCalc')
require('../../public/javascripts/groupBy')
let categoryData = []
let DateGroup = []
let selectCategory = ''



// 定義首頁路由
router.get('/', (req, res) => {
  // 取出 category model 所有資料
  Category.find()
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })  // 排序(順)
    .then((categoryies) => {
      categoryData = categoryies
    })
    .then(() => {
      // 取出 Record model 所有資料
      return Record.find()
        .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ date: 'desc' })  // 排序(反)
        .then((records) => {
          DateGroup = records.groupBy('date')
          console.log(DateGroup)

          // 將資料傳給 index 樣板
          return res.render('index', { records, categoryies: categoryData, DateGroup, totalAmount: totalCalc(records) })
        })
        .catch((error) => console.log(error))  // 錯誤處理  
    })
    .catch((error) => console.log(error))  // 錯誤處理  
})

// 資料分類
// router.get('/:keyword', (req, res) => {
//   // 取得keyword
//   const keyword = req.params.keyword
//   selectCategory = keyword
//   console.log(selectCategory)
//   // 取出 Record model 所有資料
//   Record.find()
//     .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ date: 'desc' })  // 排序(反)
//     .then((records) => {
//       records = records.filter((item) => {
//         return item.category === keyword
//       })

//       // 將資料傳給 index 樣板
//       return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
//     })
//     .catch((error) => console.log(error))  // 錯誤處理  
// })

// 匯出路由模組
module.exports = router