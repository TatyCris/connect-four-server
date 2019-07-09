const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../user/model')
const Column = require('../columns/model')

const Game = sequelize.define('game',
    {
        name: {
            type: Sequelize.STRING,
            field: 'room_name'
        }
    },
    {   timestamps: null,
        tableName: 'game' }
)

// Game.hasMany(User)
// Game.hasMany(Column)



module.exports = Game