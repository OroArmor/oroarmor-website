const express = require('express')
const path = require('path')
const app = express().use(express.static(path.join(__dirname, 'public'))
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})
