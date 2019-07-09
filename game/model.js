const Sequelize = require('sequelize')
const sequelize = require('../db')
const Column = require('../columns/model')

const Game = sequelize.define('game',
    {
        name: {
            type: Sequelize.STRING,
            field: 'game_name'
        }
    },

    { tableName: 'game' }
)

Game.hasMany(Column)
Column.belongsTo(Game)

module.exports = Game