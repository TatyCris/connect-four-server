const Sequelize = require('sequelize')
const sequelize = require('../db')

const Game = sequelize.define('game', 
    {
        boardIndex: {
            type: Sequelize.INTEGER
        },
        row: {
            type: Sequelize.STRING
        }
    },
        {tableName: 'games'}
)

module.exports = Game