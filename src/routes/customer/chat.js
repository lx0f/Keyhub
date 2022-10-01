const express = require('express');
const router = express.Router();
const { Room } = require('../../models');

router.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

router.route('/').get(async (req, res) => {
  const defaultRoomName = 'Default Room';
  const room = await Room.findOne({
    where: {
      name: defaultRoomName,
    },
  });
  const rooms = await Room.findAll();
  return res.render('customer/chat', {
    room,
    rooms,
  });
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByPk(id);
  const rooms = await Room.findAll();
  return res.render('customer/chat', { room, rooms });
});

module.exports = router;
