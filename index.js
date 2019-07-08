const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const db = require('./db')
// const messagesModel = require('./messages/model')
// const messageRouter = require('./messages/router')

const app = express()

app.use(cors())

const jsonParser = bodyParser.json()
app.use(jsonParser)

app.use(messageRouter)

const port = process.env.PORT || 5000

function onListen () {
    console.log(`Listen on: ${port}`);
}

app.listen(port, onListen)