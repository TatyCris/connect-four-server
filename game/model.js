const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../user/model')
const Column = require('../columns/model')


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