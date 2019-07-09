const Column = require('./model')
const Game = require('../game/model')
const { Router } = require('express')
const Sse = require('json-sse')

const router = new Router()

// router.get('/games/:id', function (req, res, next) {
//     const id = req.params.id
//     Game.findByPk(id)
//         .then(game => res.json(game))
//         .catch(err => next(err))
// })

Column
    .findAll()
    .then(columns => {
        const json = JSON.stringify(columns)
        const stream = new Sse(json)

        function onStream(req, res) {
            stream.init(req, res)
        }
        router.get('/stream', onStream)

        router.get('/games/:id/columns', (req, res) => {
            Column.findAll()
                .then(game => res.json(game))
                .catch(err => next(err))
        })

        router.post('/games/:id/columns', (req, res) => {
            Game
                .findOne({
                    where: {
                        id: req.params.id,
                    }
                })
                .then(game => {
                    if (!game) {
                        res.status(404).send(game)
                    }
                    req.body.gameId = game.id

                    Column
                        .create(req.body)
                        .then(game => {
                            for (i = 1; i < 8; i++) {
                                Column.create({ game, boardIndex: i })
                            }
                            return res.status(201).send(game)
                        })
                        .catch(err => next(err))
                })
        })

    })
    .catch(err => next(err))

module.exports = router