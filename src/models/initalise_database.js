const sequelize  = require("./database_setup");
const User = require("./User");

const initaliseDatabase = () => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize
        .sync({ alter: true })
        .then((e) => console.log("Successfully altered"))
        .catch((e) => {
          console.log(e)
          sequelize.sync({force: true})
        });
    })
    .catch((err) => console.log(err));
};

module.exports = initaliseDatabase