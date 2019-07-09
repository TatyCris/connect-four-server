const Sequelize = require('sequelize')
const sequelize = require('../db')
const Game = require('../game/model')

const Column = sequelize.define('column', 
    {
        boardIndex: {
            type: Sequelize.INTEGER
        },
        row: {
            type: Sequelize.STRING
        }
    },
        {tableName: 'columns'}
)

Column.belongsTo(Game)
Game.hasMany(Column)
module.exports = Column