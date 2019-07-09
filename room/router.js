const express = require('express')
const router = express.Router()
const Room = require('./model')
const auth = require('../auth/middleware')
const Sse = require('json-sse')

router.get('/rooms', function (req, res, next) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Promise.all([
        Room.count(),
        Room.findAll({ limit, offset })
    ])
        .then((total, rooms) => {
            res.send({ rooms, total })
        })
        .catch(error => next(error))
})

Room
    .findAll()
    .then(rooms => {
        const json = JSON.stringify(rooms)
        const stream = new Sse(json)

        router.get('/stream', function (req,res,next){
            return stream.init(req, res)
        })

        router.post('/rooms', function (req, res, next) {
            const room = req.body
            Room
                .create(room)
                .then(room => {
                    if(!room){
                        return res.status(404).send({
                            message: 'Room does not exist'
                        })
                    }
                Room
                    .findAll()
                    .then(rooms =>{
                        const json = JSON.stringify(rooms)
                        stream.updateInit(json)
                        stream.send(json)
                        return res.send(room)
                    })
                })
                .catch(err => next(err))
        })
    })
    .catch(err=> next(err))

// router.post('/rooms',  (req, res, next) =>{
//     Room
//         .create(req.body)
//         .then(room => {
//             Room
//                 .findAll()
//                 .then(rooms => {
//                     const json = JSON.stringify(rooms)
//                     const stream = new Sse(rooms)
//                     stream.updateInit(json)
//                     stream.send(json)
//                     res.status(201).send(room)
//                 })
//                 .catch(err => console.log(err))
//         })
//         .catch(err => next(err))
// })

// router.post('/rooms',  function (req, res, next) {
//     Room
//         .create(req.body)
//         .then(room => res.json(room))
//         .catch(err => next(err))
// })

router.get('/rooms/:id',  function (req, res, next) {
    const id = req.params.id
    Room.findByPk(id)
        .then(room => res.json(room))
        .catch(err => next(err))
})

router.put('/rooms/:id',  function (req, res, next) {
    const { id } = req.params
    const { name } = req.body
    Room.findByPk(id)
        .then(room => room.update({ name }))
        .then(room => res.json(room))
        .catch(err => next(err))
})

module.exports = router
