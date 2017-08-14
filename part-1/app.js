const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.get('/api/shout/:word', (req, res) => {
  const { word } = req.params
  const capitalizeWord = word.toUpperCase()

  res.setHeader('content-type', 'application/text')
  res.send(capitalizeWord + '!!!')
})

app.post('/api/array/merge', (req, res) => {
  const { a, b } = req.body

  if(Array.isArray(a) && Array.isArray(b)) {
    const newArray = a.reduce((arr, c, i) => arr.concat(c, b[i]), [])
    res.json({
      "result": newArray
    })
  } else {
    res.status(400).json({
      "error": "Both keys in request body must be of type Array."
    })
  }
})

module.exports = app

app.listen(port)
console.log('listening on port: 5000')
