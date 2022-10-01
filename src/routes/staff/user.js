const express = require('express');
const { User } = require('../../models');
const router = express.Router();

/*
Use cases:
  view users
  edit user staff role
  force delete user
*/

router.route('/').get(async (req, res) => {
  const users = await User.findAll();
  return res.render('staff/user/table', { users });
});

router
  .route('/:id')
  .get(async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findByPk(userId);
    return res.render('staff/user/view', { user });
  })
  .put(async (req, res) => {
    const { id: userId } = req.params;
    const { isStaff, disabled } = req.body;

    const user = await User.findByPk(userId);
    user.isStaff = isStaff || user.isStaff;
    user.disabled = disabled || user.disabled;
    await user.save();

    req.flash('success', 'Successfully updated user');
    return res.redirect('back');
  });

module.exports = router;
