// 載入套件
const db = require('../../config/mongoose')
// 載入 Record model
const Record = require('../record')
// 範本資料
const recordList = require('../../record.json')

// 新增種子資料
db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')

  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      date: recordList[i].date,
      category: recordList[i].category,
      icon: recordList[i].icon,
      amount: recordList[i].amount
    })
  }

  // 資料建立成功
  console.log('Record Data Insert Done')
})