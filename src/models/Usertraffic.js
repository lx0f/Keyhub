const Sequelize = require('sequelize');
const sequelize = require('./database_setup');

class Usertraffic extends Sequelize.Model {
   
}

Usertraffic.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        path: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        pathcount: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        usercount: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: 'Usertraffic',
    }
);


class Individualtraffic extends Sequelize.Model {
   
}

Individualtraffic.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        UserId: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        path: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        visitcount: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        latestvisit: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            unique: false,
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: 'Individualtraffic',
    }
);

Usertraffic.hasMany(Individualtraffic);
Individualtraffic.belongsTo(Usertraffic);

module.exports = { Usertraffic, Individualtraffic };
