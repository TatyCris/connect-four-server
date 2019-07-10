const express = require('express')
const router = express.Router()
const Room = require('./model')
const Column = require('../column/model')
const auth = require('../auth/middleware')
const Sse = require('json-sse')

const query = {
    include: [{
        model: Column,
        order: [
            [Column, 'index', 'ASC']
        ],
    }]
}

Room
    .findAll(query)
    .then(rooms => {
        const json = JSON.stringify(rooms)
        const pretty = JSON.stringify(rooms, null, 2)
        const stream = new Sse(json)

        router.get('/rooms/stream', function (req, res, next) {
            return stream.init(req, res)
        })

        router.get('/rooms', function (req, res, next) {
            Room
                .findAll()
                .then(room => res.status(200).send(room))
                .catch(err => next(err))
        })

        router.post('/rooms', function (req, res, next) {
            return Room
                .create(req.body)
                .then(room => {
                    if (!room) {
                        return res.status(404).send({
                            message: 'Room does not exist'
                        })
                    }
                    
                    const columns = []
                    for (i = 1; i < 8; i++) {
                       columns.push({ index: i, roomId: room.id })
                    }

                    return Column
                        .bulkCreate(columns)
                        .then(() => {
                            return Room
                                .findAll(query)
                                .then(rooms => {
                                    const json = JSON.stringify(rooms)
                                    stream.updateInit(json)
                                    stream.send(json)
                                    return res.send(room)
                                })
                        })                    
                })
                .catch(err => next(err))
        })

        router.get('/rooms/:id', function (req, res, next) {
            const id = req.params.id
            Room.findByPk(id)
                .then(room => res.json(room))
                .catch(err => next(err))
        })

        router.put('/rooms/:id', function (req, res, next) {
            const { id } = req.params
            const { name } = req.body
            Room.findByPk(id)
                .then(room => room.update({ name }))
                .then(room => res.json(room))
                .catch(err => next(err))
        })

    })
    .catch(err => next(err))


module.exports = router
