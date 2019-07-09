const Game = require('./model')
const { Router } = require('express')
const Sse = require('json-sse')
const Room = require('../room/model')

const router = new Router()

Game
    .findAll()
    .then(games => {
        const json = JSON.stringify(games)
        const stream = new Sse(json)

        function onStream(req, res) {
            stream.init(req, res)
        }
        router.get('/stream', onStream)

        router.get('/rooms/:id/games', (req, res) => {
            Game.findAll()
                .then(game => res.json(game))
                .catch(err => next(err))
        })

        router.post('/rooms/:id/games', (req, res, next) => {
            Room
                .findOne({
                    where: {
                        id: req.params.id,
                    }
                })
                .then(room => {
                    if (!room) {
                        res.status(404).send(room)
                    } else {
                        const roomId = req.body.roomId
                        for (i = 1; i < 8; i++) {
                            Game.create({ boardIndex: i , roomId})
                        }
                        return res.status(201).send(room)
                    }
                })
                .catch(err => next(err))
        })

    })
    .catch(err => next(err))

module.exports = router