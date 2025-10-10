const { User } = require('../models');

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('please fill the email and password');
  }

  try {
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
      return res.status(401).json({ message: 'Login gagal', error: info && info.message ? info.message : 'Email atau password salah' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal membuat session', error: err.message });
      }
      return res.status(200).json({ message: 'Login berhasil' });
    });
  })(req, res, next);
});

module.exports = router;
