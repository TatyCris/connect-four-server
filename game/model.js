const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game',
    {
        name: {
            type: Sequelize.STRING,
            field: 'game_name'
        }
    },
    { tableName: 'game' }
)

module.exports = Game