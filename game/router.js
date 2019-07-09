const express = require('express')
const router = express.Router()
const Game = require('./model')
const auth = require('../auth/middleware')
const Sse = require('json-sse')

router.get('/games', auth, function (req, res, next) {
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

Game
    .findAll()
    .then(games => {
        const json = JSON.stringify(games)
        const stream = new Sse(json)

        router.get('/stream', function (req,res,next){
            return stream.init(req, res)
        })

        router.post('/games', function (req, res, next) {
            const {game} = req.body
            Game
                .create({game})
                .then(game => {
                    if(!game){
                        return res.status(404).send({
                            message: 'Game does not exist'
                        })
                    }
                Game
                    .findAll()
                    .then(games =>{
                        const json = JSON.stringify(games)
                        stream.updateInit(json)
                        stream.send(json)
                        return res.send(game)
                    })
                })
                .catch(err => next(err))
        })
    })
    .catch(err=> next(err))

router.post('/games', auth, (req, res, next) =>{
    Game
        .create(req.body)
        .then(game => {
            Game
                .findAll(gameId, {include:[User]})
                .then(games => {
                    const json = JSON.stringify(games)
                    const stream = new Sse(games)
                    stream.updateInit(json)
                    stream.send(json)
                    res.status(201).send(game)
                })
                .catch(err => console.log(err))
        })
        .catch(err => next(err))
})

router.post('/games', auth, function (req, res, next) {
    Game
        .create(req.body)
        .then(game => res.json(game))
        .catch(err => next(err))
})

router.get('/games/:id', auth, function (req, res, next) {
    const id = req.params.id
    Game.findByPk(id)
        .then(game => res.json(game))
        .catch(err => next(err))
})

router.put('/games/:id', auth, function (req, res, next) {
    const { id } = req.params
    const { name } = req.body
    Game.findByPk(id)
        .then(game => game.update({ name }))
        .then(game => res.json(game))
        .catch(err => next(err))
})

module.exports = router
