// 引用 Express 與 Express 路由器
const express = require('express')
// 準備引入路由模組
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 expense 模組程式碼
const expense = require('./modules/expense')
// 引入 users 模組程式碼
const users = require('./modules/users')

// 掛載 middleware
const { authenticator } = require('../middleware/auth')

// 加入驗證程序
// 將網址結構符合 /express 字串的 request 導向 express 模組
router.use('/expense', authenticator, expense)
// 將網址結構符合 / 字串的 users 導向 home 模組
router.use('/users', users)
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router