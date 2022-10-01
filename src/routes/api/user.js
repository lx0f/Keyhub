const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { User } = require('../../models');

/*
Endpoints:
  '/'
  '/email/:email'
  '/username/:username'
  ':id'
*/

router.route('/').get((req, res) => {});

router.route('/staff').get(async (req, res) => {
  return res.json(
    await User.findAll({
      where: {
        isStaff: 1,
      },
    })
  );
});

router.route('/staff/:query').get(async (req, res) => {
  const { query } = req.params;
  const users = await User.findAll({
    attributes: ['id', 'username'],
    where: {
      username: {
        [Op.regexp]: query,
      },
      isStaff: 1,
    },
  });
  return res.json(users);
});

module.exports = router;
