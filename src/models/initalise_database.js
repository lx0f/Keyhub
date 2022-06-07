const sequelize  = require("./database_setup");
const User = require("./user");
const superusers = require("../../data/superusers")

const initaliseDatabase = async () => {
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

 
    for(const superuser in superusers) {

      if(!(await User.findOne({where: {email: superusers[superuser].email}}) || await User.findOne({where: {username: superusers[superuser].username}}) )){

        User.create({email: superusers[superuser].email, username: superusers[superuser].username, password: superusers[superuser].password ,isStaff: superusers[superuser].isStaff })
      }
    }
  //if(User.findOne())
};

module.exports = initaliseDatabase