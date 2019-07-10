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
        .findOne({ where: { id: req.params.id }})
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
    const id = (req.params.id)
    const rows = req.body.rows

    Column
        .findByPk(id)
        .then(column => column.update( {rows} ))
        .then(column => {
            column.map(col=>{
                const rows = col.rows.map(row =>{
                    row
                })

                if(rows.length < 6){
                    let missing = 6 - rows.length

                    for(i = missing; i< rows.length; i++){
                        rows.push(column)
                    }
                }
            })
            res.status(200).send(column)
        
        })
        .catch(err => next(err))
})

module.exports = router