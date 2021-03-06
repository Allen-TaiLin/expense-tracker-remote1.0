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
    type: String,
    required: true
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
  },
  merchant: {
    type: String,
    required: true
  },
  showDate: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// 匯出模型樣板
module.exports = mongoose.model('Record', recordSchema)