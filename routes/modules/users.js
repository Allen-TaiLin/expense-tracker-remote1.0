const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('該帳戶已存在!')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      if (password !== confirmPassword) {
        console.log('密碼不相符!')
        return res.render('register', { name, email, password, confirmPassword })
      }

      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
    }).catch((error) => console.log(error))
})

router.get('/logout', (req, res) => {

})

module.exports = router