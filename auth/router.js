const { Router } = require('express')
const {toJWT} = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router()

router.post('/logins', function (req, res) {
    const email = req.body.email
    const login = req.body.login

    if(!email && !login){
        res.status(400).send({
            message: 'Please enter a valid email and/or password'
        })
    } else {
        //Find user based on the email adress
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (!user) {
                    res.status(400).send({
                        message: `User with this email does not exist`
                    })
                }
                //use bcrypt to check the password
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

router.get('/secret-endpoint', auth, (req, res) =>{
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email} `
    })
})

module.exports = router