const { Address } = require('../../models');

const addresses = [
  {
    UserId: 3,
    country: 'Singapore',
    zipCode: 123123,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#03-23',
  },
  {
    UserId: 4,
    country: 'Singapore',
    zipCode: 123124,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#04-23',
  },
  {
    UserId: 5,
    country: 'Singapore',
    zipCode: 123125,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#05-23',
  },
  {
    UserId: 6,
    country: 'Singapore',
    zipCode: 123126,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#06-23',
  },
  {
    UserId: 7,
    country: 'Singapore',
    zipCode: 123127,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#07-23',
  },
  {
    UserId: 8,
    country: 'Singapore',
    zipCode: 123128,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#010-23',
  },
  {
    UserId: 9,
    country: 'Singapore',
    zipCode: 123129,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#011-23',
  },
  {
    UserId: 10,
    country: 'Singapore',
    zipCode: 123129,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#012-23',
  },
  {
    UserId: 11,
    country: 'Singapore',
    zipCode: 123129,
    city: 'Singapore',
    street: 'Bakers Ville',
    unitNumber: '#013-23',
  },
];
const initTestAddresses = async () => {
  addresses.forEach(async (address) => {
    const { country, street, zipCode } = address;
    const [newPaymentMethod, created] = await Address.findOrCreate({
      where: { country, street, zipCode },
      defaults: { ...address },
    });
  });
};

module.exports = { initTestAddresses, addresses };
