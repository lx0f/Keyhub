const initPassports = async () => {
  require('../../services/oauth20');
  require('./anonymous');
  require('./local');
};
module.exports = { initPassports };
