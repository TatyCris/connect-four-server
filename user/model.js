const Sequelize = require('sequelize')
const sequelize = require('../db')
const Game = require('../game/model')

const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
        timestamps: false,
        tableName: 'users'
    })

User.belongsTo(Game)
Game.hasMany(User);
module.exports = User