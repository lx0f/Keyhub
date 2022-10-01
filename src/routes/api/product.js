const express = require('express');
const router = express.Router();

const { Product } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {})
  .post(async (req, res) => {});

router
  .route('/:id')
  .get(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

module.exports = router;
