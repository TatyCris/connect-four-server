const { Router } = require('express')
const {toJWT} = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router()

router.post('/login', function (req, res) {
    const userName = req.body.userName
    const password = req.body.password

    if(!userName && !password){
        res.status(400).send({
            message: 'Please enter a valid userName and/or password'
        })
    } else {
        User
            .findOne({
                where: {
                    userName: userName
                }
            })
            .then(user => {
                if (!user) {
                    res.status(400).send({
                        message: `User with this userName does not exist`
                    })
                }
                if(bcrypt.compareSync(password, user.password)) {
                    res.send({
                        jwt: toJWT({userId: user.id})
                    })
                }
                else {
                    res.status(400).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Something is not correct"
                })
            })
    }
})

router.get('/authentication', auth, (req, res) => {
    res.send({
        message: `The user ${req.user.userName} is authenticated`,
    })
})

module.exports = router