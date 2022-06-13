const sequelize = require("./database_setup");
const User = require("./user");
const superusers = require("../../data/superusers");

const initaliseDatabase = async () => {

   sequelize
    .authenticate()
    .then(() => {
      sequelize
        .sync({ alter: true })
        .then((e) => console.log("Successfully altered"))
        .catch((e) => {
          console.log(e);
          sequelize.sync({ force: true });
        });
    })
    .catch((err) => {
      console.log(err);
      
    });

  Object.entries(superusers).forEach(async ([key, superuser]) => {
    if (
      !(
        (await User.findOne({ where: { email: superuser.email } })) ||
        (await User.findOne({ where: { username: superuser.username } }))
      )
    ) {
      const user = await User.create({
        email: superuser.email,
        username: superuser.username,
        password: superuser.password,
        isStaff: superuser.isStaff,
      });
    }
  });

  //if(User.findOne())
};

module.exports = initaliseDatabase;
