// 載入套件
const mongoose = require('mongoose')
// 使用mongoose.Schema
const SChema = mongoose.Schema
// 建立Schema規則
const categorySchema = new SChema({
  category: {
    type: String,  // 資料型別是字串
    required: true  // 這是個必填欄位
  },
  categoryName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  orderByID: {
    type: Number,
    required: true
  }
})

//匯出模型樣板
module.exports = mongoose.model('Category', categorySchema)