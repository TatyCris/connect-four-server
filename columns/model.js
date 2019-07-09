const Sequelize = require('sequelize')
const sequelize = require('../db')

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

module.exports = Column