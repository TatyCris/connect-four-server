const Sequelize = require('sequelize')
const sequelize = require('../db')
const Game = require('../game/model')

// const User = sequelize.define('user', {
//     userName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
// }, {
//         timestamps: false,
//         tableName: 'users'
//     })

const Column = sequelize.define('columns', 
    {
        boardIndex: {
            type: Sequelize.INTEGER,
        },
        rows: {
            type: Sequelize.STRING
        }
    },
    { tableName: 'column' }
)

// Column.belongsTo(Game,{as:'column', foreignKey: 'columnId'})
module.exports = Column