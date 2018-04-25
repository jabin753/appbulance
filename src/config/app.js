const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../views'))
app.set('port',process.env.port || 8887);
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: false}))

module.exports = app