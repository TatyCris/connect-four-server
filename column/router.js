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

// router.post('/rooms/:id/columns', (req, res, next) => {
//     Room
//         .findOne({ where: { id: req.params.id } })
//         .then(room => {
//             if (!room) {
//                 res.status(404).send(room)
//             } else {
//                 const roomId = req.params.id
//                 for (i = 1; i < 8; i++) {
//                     Column.create({ index: i, roomId })
//                 }
//                 return res.status(201).send(room)
//             }
//         })
//         .catch(err => next(err))
// })

// router.put('/rooms/:id/columns', function (req, res, next) {
//     // console.log('hifromtaty')
//     // console.log('req:', req.body)
//     const roomId = req.params.id
//     const { player } = req.body
//     const { index } = req.body

//     Column
//         .findAll({ where: { roomId, index } })
//         .then(columns => {
//             const promises = columns.reverse().map(column => {
//                 // console.log('heretaty', column.dataValues.rows, column.dataValues.rows.length)
//                 if (column.dataValues.rows.length < 6) {
//                     return column.update({
//                         rows: [...column.dataValues.rows, player]
//                     })
//                 } else {
//                     return null
//                 }
//             })

//             Promise
//                 .all(promises)
//                 .then(results => {
//                     res.send(results)
//                 })
//         })
//         .catch(err => next(err))
// })

module.exports = router
