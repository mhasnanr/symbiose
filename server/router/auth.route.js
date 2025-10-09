const { User } = require('../models');

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('hi');
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
router.post('/login', passport.authenticate('local'), (err, req, res) => {
  res.status(200).json({ message: 'login berhasil' });
});

module.exports = router;
