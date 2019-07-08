const Sequelize = require('sequelize')
const sequelize = require('../db')
const Game = require('../game/model')

const Column = sequelize.define('column',
    {
        boardIndex: {
            type: Sequelize.INTEGER,
        },
        rows: {
            type: [Sequelize.STRING]
        }
    },
    { tableName: 'column' }
)

Column.belongsTo(Game)
module.exports = Column