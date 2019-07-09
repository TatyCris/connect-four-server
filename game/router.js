const { Router } = require('express')
const Sse = require('json-sse')
const Game = require('./model')
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
        router.get('/rooms/:id/games/stream', onStream)

        router.get('/rooms/:id/games', (req, res) => {
            Game
                .findAll({ where: { roomId: req.params.id }})
                .then(game => res.json(game))
                .catch(err => next(err))
        })

        router.post('/rooms/:id/games', (req, res, next) => {
            Room
                .findOne({ where: { id: req.params.id }})
                .then(room => {
                    if (!room) {
                        res.status(404).send(room)
                    } else {
                        const roomId = req.params.id
                        for (i = 1; i < 8; i++) {
                            Game.create({ boardIndex: i, roomId })
                        }
                        return res.status(201).send(room)
                    }
                })
                .catch(err => next(err))
        })
    })
    .catch(err => next(err))

module.exports = router