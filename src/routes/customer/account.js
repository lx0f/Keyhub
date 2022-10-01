const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Address, PaymentMethod, Order, Delivery } = require('../../models');

router.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

router.route('/').get(async (req, res) => {
  return res.render('account/profile/main');
});

router
  .route('/edit')
  .get(async (req, res) => {
    return res.render('account/profile/edit');
  })
  .put(async (req, res) => {});

router.route('/order').get(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      UserId: req.user.id,
      status: {
        [Op.not]: 'done',
      },
    },
    include: [Address, Delivery],
  });
  return res.render('account/order/active', { orders });
});

router.route('/order/history').get(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      UserId: req.user.id,
      status: 'done',
    },
    include: [Address, Delivery],
  });
  return res.render('account/order/history', { orders });
});

router.route('/ticket').get(async (req, res) => {
  return res.render('account/order');
});

router.route('/delivery').get(async (req, res) => {
  return res.render('account/delivery');
});

router
  .route('/address')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    const addresses = await Address.findAll({ where: { UserId: userId } });
    return res.render('account/address/main', { addresses });
  })
  .post(async (req, res) => {
    const { country, city, street, zipCode, unitNumber } = req.body;
    const { id: userId } = req.user;

    let hasError = false;
    if (!country) {
      req.flash('error', 'Country is missing');
      hasError = true;
    }
    if (!city) {
      req.flash('error', 'City is missing');
      hasError = true;
    }
    if (!street) {
      req.flash('error', 'Street is missing');
      hasError = true;
    }
    if (!zipCode) {
      req.flash('error', 'Zip code is missing');
      hasError = true;
    } else if (!Number.isInteger(parseInt(zipCode))) {
      req.flash('error', 'Zip code must be a number');
      hasError = true;
    }
    if (hasError) {
      return res.redirect('back');
    }

    await Address.create({
      UserId: userId,
      city,
      country,
      street,
      zipCode,
      unitNumber,
    });

    req.flash('success', 'Address added!');
    return res.redirect('back');
  });

router.route('/address/add').get(async (req, res) => {
  return res.render('account/address/add');
});

router.route('/address/:id').delete(async (req, res) => {
  const { id: addressId } = req.params;
  const address = await Address.findByPk(addressId);
  try {
    await address.destroy();
  } catch (error) {
    req.flash('error', 'Try again after a while.');
    return res.redirect('back');
  }
  return res.redirect('back');
});

router
  .route('/payment')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    const paymentMethods = await PaymentMethod.findAll({
      where: {
        UserId: userId,
      },
    });
    return res.render('account/payment/main', { paymentMethods });
  })
  .post(async (req, res) => {
    const { holderName, cardNumber, expiryDateMonth, expiryDateYear, cvv } =
      req.body;
    const { id: userId } = req.user;
    const expiryDate = expiryDateMonth + '/' + expiryDateYear;
    let hasError = false;
    if (!holderName) {
      req.flash('error', 'Holder name is missing!');
      hasError = true;
    }
    if (!cardNumber) {
      req.flash('error', 'Card number is missing!');
      hasError = true;
    }
    if (!expiryDateMonth) {
      req.flash('error', 'Expiry date month is missing!');
      hasError = true;
    }
    if (!expiryDateYear) {
      req.flash('error', 'Expiry date year is missing!');
      hasError = true;
    }
    if (!cvv) {
      req.flash('error', 'cvv is missing!');
      hasError = true;
    }
    if (hasError) {
      return res.redirect('back');
    }

    req.flash('success', 'Payment method added');

    await PaymentMethod.create({
      UserId: userId,
      holderName,
      cardNumber,
      expiryDate,
      cvv,
    });
    return res.redirect('back');
  });

router.route('/payment/add').get(async (req, res) => {
  return res.render('account/payment/add');
});

router.route('/payment/:id').delete(async (req, res) => {
  const { id: paymentMethodId } = req.params;
  const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
  try {
    await paymentMethod.destroy();
  } catch (error) {
    req.flash('error', 'Try again after a while.');
    return res.redirect('back');
  }
  return res.redirect('back');
});

module.exports = router;
