const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const userRouter = require('./user/router')
const columnRouter = require('./columns/router')
const gameRouter = require('./game/router')
const gameModel = require('./game/model')
const userModel = require('./user/model')
const columnModel = require('./columns/model')
const authRouter = require('./auth/router')


const app = express()
const jsonParser = bodyParser.json()



const port = process.env.PORT || 5000

function onListen () {
    console.log(`Listen on: ${port}`);
}
app.use(cors())
app.use(jsonParser)
app.use(userRouter)
app.use(columnRouter)
app.use(gameRouter)
app.listen(port, onListen)
app.use(gameRouter)
app.use(authRouter)
