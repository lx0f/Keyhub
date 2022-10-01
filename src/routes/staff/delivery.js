const express = require('express');
const router = express.Router();
const { Delivery, Address, Order } = require('../../models');

/*
Use cases:
  view active deliveries
  force stop delivery
*/

router.route('/').get(async (req, res) => {
  const deliveries = await Delivery.findAll();
  return res.render('staff/delivery/table', { deliveries });
});

router
  .route('/:id')
  .get(async (req, res) => {
    const { id: deliveryId } = req.params;
    const delivery = await Delivery.findByPk(deliveryId, { include: Address });
    return res.render('staff/delivery/view', { delivery });
  })
  .put(async (req, res) => {
    const { id: deliveryId } = req.params;
    const { action } = req.body;
    const delivery = await Delivery.findByPk(deliveryId);
    if (action == 'next') {
      await delivery.next();
      if (delivery.stage == 'received') {
        const order = await Order.findByPk(delivery.OrderId);
        order.update({ status: 'done' });
      }
    } else if (action == 'back') {
      await delivery.back();
    }
    return res.redirect('back');
  });

module.exports = router;
