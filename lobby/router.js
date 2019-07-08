const express = require('express')
const router = express.Router()
const Lobby = require('./model')

router.get('/lobbys', function (req, res, next) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Promise.all([
        Lobby.count(),
        Lobby.findAll({ limit, offset })
    ])
        .then(([total, lobbys]) => {
            res.send({ lobbys, total })
        })
        .catch(error => next(error))
})

router.post('/lobbys', function (req, res, next) {
    Lobby
        .create(req.body)
        .then(lobby => res.json(lobby))
        .catch(err => next(err))
})

router.get('/lobbys/:id', function (req, res, next) {
    const id = req.params.id
    Lobby.findByPk(id)
        .then(lobby => res.json(lobby))
        .catch(err => next(err))
})

module.exports = router
