const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../user/model')
const Column = require('../columns/model')

const Game = sequelize.define('room',
    {
        name: {
            type: Sequelize.STRING,
            field: 'room_name'
        }
    },
    { tableName: 'room' }
)

Game.hasMany(User)
Game.hasMany(Column)

module.exports = Game