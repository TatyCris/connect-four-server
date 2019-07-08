const express = require('express')
const router = express.Router()
const Game = require('./model')

router.get('/games', function (req, res, next) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Promise.all([
        Game.count(),
        Game.findAll({ limit, offset })
    ])
        .then(([total, games]) => {
            res.send({ games, total })
        })
        .catch(error => next(error))
})

router.post('/games', function (req, res, next) {
    Game
        .create(req.body)
        .then(game => res.json(game))
        .catch(err => next(err))
})

router.get('/games/:id', function (req, res, next) {
    const id = req.params.id
    Game.findByPk(id)
        .then(game => res.json(game))
        .catch(err => next(err))
})

router.put('/games/:id', function (req, res, next) {
    const { id } = req.params
    const { name } = req.body
    Game.findByPk(id)
        .then(game => {
            return game.update({ name })
        })
        .then(game => res.json(game))
        .catch(err => next(err))
})

module.exports = router
