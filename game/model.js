const Sequelize = require('sequelize')
const sequelize = require('../db')

const Game = sequelize.define('game',
    {
        name: {
            type: Sequelize.STRING,
            field: 'game_name'
        }
    },

    { tableName: 'game' }
)

module.exports = Game