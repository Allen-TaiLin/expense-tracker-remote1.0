// 載入套件
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
// 載入 Record model
const Record = require('../record')
const User = require('../user')
// 範本資料
const recordList = require('../../record.json')

const SEED_USER = [
  {
    name: 'Tony',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'Stark',
    email: 'user2@example.com',
    password: '12345678'
  }
]

// 新增種子資料
db.once('open', async () => {
  console.log('MongoDB connected recordSeeder!')

  const promiseArray = []
  await new Promise((resolve, reject) => {
    for (let i = 0; i < SEED_USER.length; i++) {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER[i].password, salt))
        .then((hash) => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash
        }))
        .then((user) => {
          const userId = user._id
          const index = i
          return Promise.all(Array.from({ length: 5 }, (item, j) => {
            return Record.create({ ...recordList[j + i * 5], userId })
          }))
            .then(() => {
              console.log(`user ${index} done!!!`)
              if (index === SEED_USER.length - 1) {
                resolve()
              }
            })
        })
    }
  })

  // 資料建立成功
  console.log('Record Data Insert Done')
  process.exit()
})