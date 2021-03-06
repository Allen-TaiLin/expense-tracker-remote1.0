// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 model
const Record = require('../../models/record')
const Category = require('../../models/category')
// 自定義方法
const getIcon = require('../../public/javascripts/iconType')
let categoryData = []


// 新增頁面
router.get('/new', (req, res) => {
  // 取得下拉式選單資料
  Category.find()
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })  // 排序(順)
    .then((categoryies) => {
      categoryData = categoryies
      //讀取new檔案、渲染畫面
      return res.render('new', { categoryies: categoryData })
    })
    .catch((error) => console.log(error))  // 例外處理
})


// 確認新增
router.post('/', (req, res) => {
  const userId = req.user._id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  // 新增icon資料
  options.icon = getIcon(req.body.category)
  // 字串替換
  options.showDate = options.date.replace(/-/g, '/')
  // 新增userId資料
  options.userId = userId
  // 建立實例模型
  const recordAddNew = new Record(options)
  // 將實例存入資料庫
  return recordAddNew.save()
    .then(() => res.redirect('/'))  // 導向首頁router
    .catch((error) => console.log(error))  // 例外處理
})


// 修改頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  // 取得_id
  const _id = req.params.id
  // 取得下拉式選單資料
  Category.find()
    .lean()
    .sort({ _id: 'asc' })  // 排序(順)
    .then((categoryies) => {
      categoryData = categoryies
    })
    .then(() => {
      // 從資料庫找出相關資料
      return Record.findOne({ _id, userId })
        .lean()  // 把資料轉成javascript物件
        .then((record) => {
          // 紀錄狀態
          categoryData.forEach((item) => {
            item.tempCategory = record.category
          })

          // 發送至前端樣板
          return res.render('edit', { record, categoryies: categoryData })
        })
        .catch((error) => console.log(error))  // 例外處理
    })
    .catch((error) => console.log(error))  // 例外處理  
})


// 確定修改
router.put('/:id', (req, res) => {
  const userId = req.user._id
  // 取得_id
  const _id = req.params.id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  // 新增icon資料
  options.icon = getIcon(req.body.category)
  // 字串替換
  options.showDate = options.date.replace(/-/g, '/')
  // 新增userId資料
  options.userId = userId
  // 從資料庫找出相關資料
  return Record.findOne({ _id, userId })
    .then((record) => {
      //對應資料，寫入資料庫
      record = Object.assign(record, options)
      return record.save()
    })
    .then(() => res.redirect('/'))  // 導向首頁
    .catch((error) => console.log(error))  // 例外處理
})


// 確定刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  // 取得_id
  const _id = req.params.id
  //從資料庫找出相關資料
  return Record.findOne({ _id, userId })
    .then((record) => record.remove())  // 刪除資料
    .then(() => res.redirect('/'))  // 導向首頁
    .catch((error) => console.log(error))  // 例外處理
})

// 匯出路由模組
module.exports = router
