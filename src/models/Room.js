const Sequelize = require("sequelize")
const sequelize = require("./database_setup")
class Room extends Sequelize.Model {

}

Room.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: 'id',
        allowNull: false,  
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        unique: "name"

    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
})

module.exports = Room