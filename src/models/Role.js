const sequelize = require('./database_setup');
const Sequelize = require('sequelize');

class Role extends Sequelize.Model {}

Role.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: 'id',
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            unique: 'name',
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Role;
