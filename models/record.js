// 載入套件
const mongoose = require('mongoose')
// 使用mongoose.Schema
const Schema = mongoose.Schema
// 建立Schema規則
const recordSchema = new Schema({
  name: {
    type: String,  // 資料型別是字串
    required: true  // 這是個必填欄位
  },
  date: {
    type: String,  // 資料型別是字串
    required: true,  // 這是個必填欄位    
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

// 匯出模型樣板
module.exports = mongoose.model('Record', recordSchema)