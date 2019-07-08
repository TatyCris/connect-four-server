const Column = require('./model')
const Game = require('../game/model')
const {Router} = require('express')

const router = new Router()

router.post('/games', (req, res) => {
    Game
        .create(req.body)
        .then(game=> {
            for (i=0; i<7; i++){
                Column.create({game, boardIndex : i})
            }
            return res.status(201).send(game)
        })
})

module.exports = router