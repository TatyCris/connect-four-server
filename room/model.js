const Sequelize = require('sequelize')
const sequelize = require('../db')
const Column = require('../column/model')

const Room = sequelize.define('room',
    {
        name: {
            type: Sequelize.STRING,
            field: 'room_name'
        }
    },

    { tableName: 'rooms' }
)

Room.hasMany(Column)
Column.belongsTo(Room)

module.exports = Room