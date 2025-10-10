const { User } = require('../models');

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!email || !password) {
      throw new Error('please fill the email and password');
    }

    if (existingUser) {
      throw new Error('email has registered, try another or log in');
    }

    const user = await User.create({ email, password });
    res.status(201).json({ message: 'berhasil membuat user', data: user });
  } catch (error) {
    res.status(500).json({ message: 'gagal membuat user', error: error.message });
  }
});

// just to create session
// by defaul passport ga pass error, so harus handle manual
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Login gagal',
        error: info && info.message ? info.message : 'Email atau password salah',
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal membuat session', error: err.message });
      }
      return res.status(200).json({ message: 'Login berhasil' });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: 'Gagal logout', error: err.message });
    }
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logout berhasil' });
    });
  });
});

module.exports = router;
