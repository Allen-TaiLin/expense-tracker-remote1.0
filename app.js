// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))

// 設定資料庫
require('./config/mongoose')

// 自定義helper
handlebars.registerHelper('if_equal', function (job, expectedJob, options) {
  if (job === expectedJob) {
    return options.fn(this);
  }
  return options.inverse(this);
})

const Record = require('./models/record')
const Category = require('./models/category')
let categoryData = []
let recordData = []
const totalCalc = require('./public/javascripts/totalCalc')
const getIcon = require('./public/javascripts/iconType')
//const dateFormat = require('./public/javascripts/dateFormat')

// routes setting
// 將 request 導入路由器
app.get('/', (req, res) => {
  if (categoryData.length === 0) {
    // 取出 category model 所有資料
    Category.find()
      .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .sort({ _id: 'asc' })  // 排序(順)
      .then((categoryies) => {
        categoryData = categoryies
      })
      .catch((error) => console.log(error))  // 錯誤處理 
  }

  // 取出 Record model 所有資料
  return Record.find()
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ date: 'desc' })  // 排序(反)
    .then((records) => {
      recordData = records
      // 將資料傳給 index 樣板
      return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
    })
    .catch((error) => console.log(error))  // 錯誤處理  
})

// 新增頁面
app.get('/expense', (req, res) => {
  if (categoryData.length === 0) {
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then((categoryies) => {
        categoryData = categoryies
      })
      .catch((error) => console.log(error))
  }
  //讀取new檔案、渲染畫面
  return res.render('new', { categoryies: categoryData })
})



// 確認新增
app.post('/expense', (req, res) => {
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  // 新增icon資料
  options.icon = getIcon(req.body.category)
  console.log(options)
  // 字串替換
  options.showDate = options.date.replace(/-/g, '/')
  console.log('date', req.body.date)
  console.log('showDate', options.showDate)
  // 建立實例模型
  const recordAddNew = new Record(options)
  // 將實例存入資料庫
  return recordAddNew.save()
    .then(() => res.redirect('/'))  // 導向首頁router
    .catch((error) => console.log(error))  // 例外處理
})

// 修改頁面
app.get('/expense/:id', (req, res) => {
  // 取得_id
  const id = req.params.id
  // 從資料庫找出相關資料
  Record.findById(id)
    .lean()  // 把資料轉成javascript物件
    .then((record) => {
      // 紀錄狀態
      categoryData.forEach((item) => {
        item.tempCategory = record.category
      })

      // 發送至前端樣板
      res.render('edit', { record, categoryies: categoryData })
    })
    .catch((error) => console.log(error))  // 例外處理
})

// 確定修改
app.put('/expense/:id', (req, res) => {
  // 取得_id
  const id = req.params.id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  // 新增icon資料
  options.icon = getIcon(req.body.category)
  // 字串替換
  options.showDate = options.date.replace(/-/g, '/')
  // 從資料庫找出相關資料
  return Record.findById(id)
    .then((record) => {
      //對應資料，寫入資料庫
      record = Object.assign(record, options)
      return record.save()
    })
    .then(() => res.redirect('/'))  // 導向首頁
    .catch((error) => console.log(error))  // 例外處理
})

app.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword
  //console.log(keyword)
  //console.log(categoryData)

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