const { initTestProducts } = require('./product');
const { initTestTickets } = require('./ticket');
const { initTestUsers } = require('./user');
const { initTestPaymentMethods } = require('./paymentMethods');
const { initTestAddresses } = require('./address');
const connection = require('../../data');

const initTestData = async () => {
  require('dotenv').config();
  if (process.env.TEST_DATA) {
    await connection.sync();
    await Promise.all([
      initTestUsers(),
      initTestTickets(),
      initTestProducts(),
      initTestPaymentMethods(),
      initTestAddresses(),
    ]);
  }
};

module.exports = {
  ...require('./paymentMethods'),
  ...require('./product'),
  ...require('./ticket'),
  ...require('./user'),
  ...require('./address'),
  initTestData,
};
