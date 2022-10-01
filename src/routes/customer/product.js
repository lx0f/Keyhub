const express = require('express');
const { Op } = require('sequelize');
const { Product, Review, User } = require('../../models');
const router = express.Router();

/*
Use cases:
  view products
  search products
  filter products
  rate products
*/

router.route('/').get(async (req, res) => {
  const products = await Product.findAll();
  return res.render('customer/product/main', { products });
});

router.route('/view/:productId').get(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByPk(productId);
  const reviews = (product.reviews = await Review.findAndCountAll({
    where: {
      ProductId: productId,
    },
    include: User,
  }));
  // TODO: reduce()
  var average = 0;
  var sum = 0;
  for (const review of reviews.rows) {
    sum += review.rating;
  }
  average = sum / reviews.count;
  product.reviews = reviews;
  product.reviews.average = average;
  product.reviews.one = reviews.rows.filter((r) => r.rating == 1).length;
  product.reviews.two = reviews.rows.filter((r) => r.rating == 2).length;
  product.reviews.three = reviews.rows.filter((r) => r.rating == 3).length;
  product.reviews.four = reviews.rows.filter((r) => r.rating == 4).length;
  product.reviews.five = reviews.rows.filter((r) => r.rating == 5).length;
  return res.render('customer/product/view', { product });
});

router.route('/:query').get(async (req, res) => {
  const { query } = req.params;
  const products = await Product.findAll({
    where: {
      // where name or description contain query
      [Op.or]: [
        {
          name: {
            [Op.regexp]: query,
          },
        },
        {
          description: {
            [Op.regexp]: query,
          },
        },
        {
          category: {
            [Op.regexp]: query,
          },
        },
      ],
    },
  });
  return res.render('customer/product/main', { products, query });
});

module.exports = router;
