const { User } = require('../../models');
const users = [
  {
    username: 'testUser1',
    email: 'testUser1@gmail.com',
    password: 'testUser1Password',
  },
  {
    username: 'testUser2',
    email: 'testUser2@gmail.com',
    password: 'testUser2Password',
  },
  {
    username: 'testUser3',
    email: 'testUser3@gmail.com',
    password: 'testUser3Password',
  },
  {
    username: 'testUser4',
    email: 'testUser4@gmail.com',
    password: 'testUser4Password',
  },
  {
    username: 'testUser5',
    email: 'testUser5@gmail.com',
    password: 'testUser5Password',
  },
  {
    username: 'testUser6',
    email: 'testUser6@gmail.com',
    password: 'testUser6Password',
  },
  {
    username: 'testUser7',
    email: 'testUser7@gmail.com',
    password: 'testUser7Password',
  },
  {
    username: 'testUser8',
    email: 'testUser8@gmail.com',
    password: 'testUser8Password',
  },
  {
    username: 'testUser9',
    email: 'testUser9@gmail.com',
    password: 'testUser9Password',
  },
  {
    username: 'testUser10',
    email: 'testUser10@gmail.com',
    password: 'testUser10Password',
  },
  {
    username: 'testUser11',
    email: 'testUser11@gmail.com',
    password: 'testUser11Password',
  },
  {
    username: 'testUser12',
    email: 'testUser12@gmail.com',
    password: 'testUser12Password',
  },
  {
    username: 'testUser13',
    email: 'testUser13@gmail.com',
    password: 'testUser13Password',
  },
  {
    username: 'testUser14',
    email: 'testUser14@gmail.com',
    password: 'testUser14Password',
  },
  {
    username: 'testUser15',
    email: 'testUser15@gmail.com',
    password: 'testUser15Password',
  },
  {
    username: 'testUser16',
    email: 'testUser16@gmail.com',
    password: 'testUser16Password',
  },
  {
    username: 'testUser17',
    email: 'testUser17@gmail.com',
    password: 'testUser17Password',
  },
  {
    username: 'testUser18',
    email: 'testUser18@gmail.com',
    password: 'testUser18Password',
  },
  {
    username: 'testUser19',
    email: 'testUser19@gmail.com',
    password: 'testUser19Password',
  },
  {
    username: 'testUser20',
    email: 'testUser20@gmail.com',
    password: 'testUser20Password',
  },
];

const initTestUsers = async () => {
  users.forEach(async (user) => {
    const [newUser, created] = await User.findOrCreate({
      where: { username: user.username },
      defaults: { ...user },
    });
  });
};

module.exports = { initTestUsers, users };
