const Game = require('./model')
const { Router } = require('express')
const Sse = require('json-sse')

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

        router.post('/rooms/:id/games', (req, res) => {
            Game
                .findOne({
                    where: {
                        id: req.params.id,
                    }
                })
                .then(game => {
                    if (!game) {
                        res.status(404).send(game)
                    } else {
                        const roomId = req.body.gameId
                        for (i = 1; i < 8; i++) {
                            Game.create({ roomId, boardIndex: i})
                            }
                            return res.status(201).send(game)
                        
                        .catch(err => next(err))
                    }
                })
        })

    })
    .catch(err => next(err))

module.exports = router