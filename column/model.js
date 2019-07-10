const Sequelize = require('sequelize')
const sequelize = require('../db')

const Column = sequelize.define('column', 
    {
        index: {
            type: Sequelize.INTEGER
        },
        rows: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: ['x', 'x', 'x', 'x', 'x', 'x', 'x']
        }
    },
    {tableName: 'columns'}
)

module.exports = Column