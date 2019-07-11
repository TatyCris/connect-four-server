const { Router } = require('express')
const Sse = require('json-sse')
const Column = require('./model')
const Room = require('../room/model')

const router = new Router()

router.get('/rooms/:id/columns', (req, res) => {
    Column
        .findAll({
            where: { roomId: req.params.id },
            order: [
                ['index', 'ASC']
            ]
        })
        .then(column => res.json(column))
        .catch(err => next(err))
})

router.post('/rooms/:id/columns', (req, res, next) => {
    Room
        .findOne({ where: { id: req.params.id } })
        .then(room => {
            if (!room) {
                res.status(404).send(room)
            } else {
                const roomId = req.params.id
                for (i = 1; i < 8; i++) {
                    Column.create({ index: i, roomId })
                }
                return res.status(201).send(room)
            }
        })
        .catch(err => next(err))
})

router.put('/rooms/:id/columns', function (req, res, next) {
    console.log('request test: ', req.body)
    const { id } = req.params
    const rows  = req.body
    Column.findByPk(id)
        .then(column => column.update( {rows:['1']}))
        .then(column => console.log('Column test: ',column)
        )
        .catch(err => next(err))
})

module.exports = router
