const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./user/router')
const roomRouter = require('./room/router')
const authRouter = require('./auth/router')

const app = express()
app.use(cors())

const jsonParser = bodyParser.json()
app.use(jsonParser)

const port = process.env.PORT || 5000

function onListen () {
    console.log(`Listen on: ${port}`);
}

app.use(userRouter)
app.listen(port, onListen)
app.use(roomRouter)
app.use(authRouter)
