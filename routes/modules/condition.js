// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Record = require('../../models/record')
const Category = require('../../models/category')
// 自定義方法
const totalCalc = require('../../public/javascripts/totalCalc')
require('../../public/javascripts/groupBy')

// 篩選、資料分類
router.get('/', async (req, res) => {

  try {
    const categoryies = await Category.find().lean().sort({ _id: 'asc' })  // 排序(順)

    const userRecords = await Record.find().lean().sort({ date: 'desc' })  // 排序(反)

    // 設定日期選單
    const DateGroup = userRecords.groupBy('date')

    // keyword
    const category = req.query.category
    const selectDate = req.query.date

    // 設定 selected 目標
    DateGroup.forEach((item) => {
      item.selectedValue = selectDate
    })

    categoryies.forEach((item) => {
      item.tempCategory = category
    })

    // 篩選條件
    records = userRecords.filter((item) => {
      if (category !== '' && selectDate !== '') {
        return item.category === category && item.date.slice(0, 7) === selectDate
      } else if (category !== '' && selectDate === '') {
        return item.category === category
      } else if (category === '' && selectDate !== '') {
        return item.date.slice(0, 7) === selectDate
      } else if (category === '' && selectDate === '') {
        return true
      }
    })

    // 將資料傳給 index 樣板
    return res.render('index', { records, categoryies: categoryies, DateGroup, totalAmount: totalCalc(records) })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router