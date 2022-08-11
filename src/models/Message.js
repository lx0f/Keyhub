const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const { v4: uuid } = require('uuid');
const Room = require('./Room');
const moment = require('moment');

class Message extends Sequelize.Model {}

Message.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        userID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: Sequelize.DataTypes.STRING,
        },
        time: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: moment().format('h:mm a'),
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
    }
);

Room.hasMany(Message);
Message.belongsTo(Room);

module.exports = Message;
