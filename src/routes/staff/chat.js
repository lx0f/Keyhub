const express = require('express');
const router = express.Router();
const { Room } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    const rooms = await Room.findAll();
    return res.render('staff/chat/table', { rooms });
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    const room = await Room.create({ name, description });
    req.flash('success', 'Room successfully created!');
    return res.redirect('back');
  });

router.route('/add').get(async (req, res) => {
  return res.render('staff/chat/add');
});

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    return res.render('staff/chat/view', { room });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const room = await Room.findByPk(id);
    room.name = name || room.name;
    room.description = description || room.description;
    await room.save();
    req.flash('success', 'Successfully updated!');
    return res.redirect('back');
  });

router.route('/:id/edit').get(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByPk(id);
  return res.render('staff/chat/edit', { room });
});

module.exports = router;
