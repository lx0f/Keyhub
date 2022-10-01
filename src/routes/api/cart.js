const express = require('express');
const router = express.Router();

const { Cart, CartItem } = require('../../models');

/*
Endpoints:
  '/'
  '/:id'
*/

router
  .route('/')
  .get(async (req, res) => {})
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

router
  .route('/:id')
  .get(async (req, res) => {
    const cartId = req.params.id;
  })
  .post(async (req, res) => {
    const cartId = req.params.id;
  })
  .put(async (req, res) => {
    const cartId = req.params.id;
  })
  .delete(async (req, res) => {
    const cartId = req.params.id;
  });

module.exports = router;
