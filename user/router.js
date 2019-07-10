const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('./model')

router.post('/users', function (req, res, next) {
    const user = {
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
    }

    if (!user.userName || !user.password) {
        res.status(401).send({
            message: 'Please supply a valid username and password'
        })
    } else {
        User
            .findOne({
                where: {
                    userName: user.userName
                }
            })
            .then(entity => {
                if (entity) {
                    res.status(401).send({
                        message: 'User with that username already exist'
                    })
                }
                User
                    .create(user)
                    .then(user => res.status(201).json(user))
                    .catch(err => next(err))
            })
            .catch(err => next(err))
    }
})

router.put('/users/:id', function (req, res, next) {
    const id = (req.params.id)
    const roomId = req.body.roomId

    User
        .findByPk(id)
        .then(user => user.update({ roomId }))
        .then(user => res.status(200).send(user))
        .catch(err => next(err))
})

module.exports = router

// res.status(200).send(column)

// .then(column => column.update({ rows }))
// .then(column => res.status(200).send(column))