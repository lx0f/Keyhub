const express = require('express');
const passport = require('passport');
const { Mail } = require('../../util');
const { User } = require('../../models');
const router = express.Router();

/*
Use cases:
  login
  logout
  register
  register / login via Google OAuth2.0
  reset password
*/

router
  .route('/register')
  .get((req, res) => {
    return res.render('register');
  })
  .post(async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    const possibleUserWithEmail = await User.findOne({
      where: {
        email,
      },
    });

    // error handling
    let hasError = false;
    if (repeatPassword != password) {
      req.flash('error', 'Your repeat password and password are not the same!');
      hasError = true;
    }
    if (possibleUserWithEmail) {
      req.flash('error', 'Email is not unique!');
      hasError = true;
    }
    if (hasError) {
      return res.redirect('back');
    }

    // create user
    await User.create({
      username,
      email,
      password,
    });

    req.flash('success', 'Successfully registered!');
    return res.redirect('/login');
  });

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
  }),
  (req, res) => {
    return res.redirect('/');
  }
);

router
  .route('/login')
  .get((req, res) => {
    return res.render('login');
  })
  .post(
    passport.authenticate(['local', 'anonymous'], {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
    }),
    (req, res) => {
      req.flash('error', 'No such account');
      return res.redirect('/login');
    }
  );

router.route('/logout').get((req, res) => {
  req.logOut();
  return res.redirect('/');
});

router
  .route('/reset-password')
  .get(async (req, res) => {
    return res.render('reset-password');
  })
  .post(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.generateResetToken();
      const link = `http://localhost:3000/reset-password/${user.id}/${user.resetTokenID}`;
      Mail.Send({
        email_recipient: email,
        subject: 'Your Reset Link',
        template_path: '../../views/mail/reset-password-mail.html',
        context: { link },
      });
    }
    req.flash(
      'success',
      'Reset link to your email sent! Please check your email.'
    );
    return res.redirect('/reset-password');
  });

router
  .route('/reset-password/:id/:uuid')
  .get(async (req, res) => {
    const { id, uuid } = req.params;
    const user = await User.findByPk(id);
    if (uuid === user.resetTokenID && user.verifyTokenAge()) {
      return res.render('verified-password-reset', {
        id,
        uuid,
      });
    }
    req.flash(
      'error',
      'The token is either invalid or expired! Please reset your password again.'
    );
    return res.redirect('/reset-password');
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const { password, repeatPassword } = req.body;
    if (password === repeatPassword) {
      await User.update({ password: password }, { where: { id } });
      req.flash('success', 'Password changed!');
      return res.redirect('/login');
    }

    req.flash('error', 'Repeat password must be the same as the password');
    return res.redirect('back');
  });

module.exports = router;
