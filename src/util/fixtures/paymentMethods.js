const { PaymentMethod } = require('../../models');
const paymentMethods = [
  {
    UserId: 3,
    holderName: 'testUser',
    cardNumber: '1234123412341235',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 4,
    holderName: 'testUser',
    cardNumber: '1234123412341236',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 5,
    holderName: 'testUser',
    cardNumber: '1234123412341237',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 6,
    holderName: 'testUser',
    cardNumber: '1234123412341238',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 7,
    holderName: 'testUser',
    cardNumber: '1234123412341239',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 8,
    holderName: 'testUser',
    cardNumber: '1234123412341240',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 9,
    holderName: 'testUser',
    cardNumber: '1234123412341241',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 10,
    holderName: 'testUser',
    cardNumber: '1234123412341242',
    expiryDate: '12/24',
    cvv: 123,
  },
  {
    UserId: 11,
    holderName: 'testUser',
    cardNumber: '1234123412341243',
    expiryDate: '12/24',
    cvv: 123,
  },
];

const initTestPaymentMethods = async () => {
  paymentMethods.forEach(async (paymentMethod) => {
    const [newPaymentMethod, created] = await PaymentMethod.findOrCreate({
      where: { cardNumber: paymentMethod.cardNumber },
      defaults: { ...paymentMethod },
    });
  });
};

module.exports = { initTestPaymentMethods, paymentMethods };
