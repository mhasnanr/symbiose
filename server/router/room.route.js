const loginRequired = require('./middleware/login-request');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {});

router.post('/', loginRequired, async (req, res) => {
  res.json({ message: 'hi' });
});

module.exports = router;
