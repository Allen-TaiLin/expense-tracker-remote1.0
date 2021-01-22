// 載入 passport、User 模組
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash('warning_msg', '此信箱尚未註冊!')
          return done(null, false, { message: '此信箱尚未註冊!' })
        }
        if (user.password !== password) {
          req.flash('warning_msg', '信箱或密碼錯誤!')
          return done(null, false, { message: '信箱或密碼錯誤!' })
        }
        return done(null, user)
      })
      .catch((error) => done(error, false)
      )
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((error) => done(error, null))
  })
}