const Sequelize = require("sequelize")
const sequelize = new Sequelize.Sequelize({
    dialect: "sqlite",
    storage: "data/database.sqlite"
})

module.exports = sequelize