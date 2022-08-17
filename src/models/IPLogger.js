const Sequelize = require("sequelize")
const sequelize = require("./database_setup")

class IPLogger extends Sequelize.Model {

}

IPLogger.init({
    country : {
        type: Sequelize.DataTypes.STRING
    },
    lat: {
        type: Sequelize.DataTypes.FLOAT
    },
    lon: {
        type: Sequelize.DataTypes.FLOAT
    },
    regionName: {
        type: Sequelize.DataTypes.STRING
    },
    ip: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        unique: "ip"
    },
    zip: {
        type: Sequelize.DataTypes.STRING
    }
},
{sequelize, freezeTableName: true})


module.exports = IPLogger