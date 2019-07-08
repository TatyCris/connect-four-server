const Sequelize = require('sequelize')
const db = require('../db')

const Lobby = db.define('lobby',
    {
        name: {
            type: Sequelize.STRING,
            field: 'lobby_name'
        }
    },
    { tableName: 'lobby' }
)

module.exports = Lobby