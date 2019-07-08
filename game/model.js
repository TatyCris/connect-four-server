const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room',
    {
        name: {
            type: Sequelize.STRING,
            field: 'room_name'
        }
    },
    { tableName: 'room' }
)

module.exports = Room