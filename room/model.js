const Sequelize = require('sequelize')
const sequelize = require('../db')
const Game = require('../game/model')

const Room = sequelize.define('room',
    {
        name: {
            type: Sequelize.STRING,
            field: 'room_name'
        }
    },

    { tableName: 'rooms' }
)

Room.hasMany(Game)
Game.belongsTo(Room)

module.exports = Room