const express = require('express')
const app = express()
const port = 3000

require('./config/mongoose')

app.get('/', (req, res) => {
  return res.send('expense-tracker')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})