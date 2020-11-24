// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//const methodOverride = require('method-override')
const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
//app.use(methodOverride('_method'))

// 設定資料庫
require('./config/mongoose')

const Record = require('./models/record')
const Category = require('./models/category')
let categoryData = []
let recordData = []
const totalCalc = require('./public/javascripts/totalCalc')
//const dateFormat = require('./public/javascripts/dateFormat')

// routes setting
// 將 request 導入路由器
app.get('/', (req, res) => {
  //return res.send('expense-tracker')
  if (categoryData.length === 0) {
    console.log('categoryData:', 0)
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then((categoryies) => {
        categoryData = categoryies
        //res.render('index', { categoryies })
      })
      .catch((error) => console.log(error))
  }

  if (recordData.length === 0) {
    console.log('recordData:', 0)
    return Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then((records) => {
        recordData = records
        return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
      })
      .catch((error) => console.log(error))
  }
  console.log('recordData:', 1)

  return res.render('index', { records: recordData, categoryies: categoryData, totalAmount: totalCalc(recordData) })
})

app.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword
  console.log(keyword)
  console.log(categoryData)

  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      records = records.filter((item) => {
        return item.category === keyword
      })

      return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
    })
    .catch((error) => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})