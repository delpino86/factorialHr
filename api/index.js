import data from "../data.json";

const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', function (req, res) {
  res.send('Test successful')
})

app.get('/users', function (req, res) {
    res.send(data.users)
  })
export default {
  path: '/api',
  handler: app
}