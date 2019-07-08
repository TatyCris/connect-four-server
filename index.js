const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./user/router')
const gameRouter = require('./game/router')
const db = require('./db')
const gameModel = require('./game/model')
const userModel = require('./user/model')
const authRouter = require('./auth/router')

const app = express()

app.use(cors())

const jsonParser = bodyParser.json()
app.use(jsonParser)

const port = process.env.PORT || 5000

function onListen () {
    console.log(`Listen on: ${port}`);
}

app.listen(port, onListen)

app.use(userRouter)
app.use(gameRouter)
app.use(authRouter)
