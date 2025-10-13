const { Room, User } = require('../models');
const loginRequired = require('../middleware/login-required');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', loginRequired, async (_, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Rooms are retrieved', data: rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', loginRequired, async (req, res) => {
  const { title, description, publicity, password } = req.body;
  try {
    const author = await User.findOne({ _id: req.user.id });
    if (!author) {
      throw new Error('User is not found');
    }

    const newRoom = await Room.create({
      author: req.user.id,
      title,
      description,
      publicity,
      password,
    });

    res.status(201).json({ message: 'Room is created successfully', data: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:roomId/join', loginRequired, async (req, res) => {
  const { roomId } = req.params;
  const { password } = req.body;

  try {
    const author = await User.findOne({ _id: req.user.id });

    if (!author) {
      throw new Error('User is not found');
    }

    const room = await Room.findOne({ _id: roomId });

    if (!room) {
      return res.status(401).json({ message: 'Room is not found' });
    }

    if (room.members.includes(req.user.id)) {
      return res.status(200).json({ message: 'Already a member', data: room });
    }

    if (room.publicity === 'private' && room.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    room.members.push(new mongoose.Types.ObjectId(req.user.id));
    await room.save();

    res.status(200).json({ message: 'Successfully joining the room', data: room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:roomId/check', loginRequired, async (req, res) => {
  const { roomId } = req.params;

  try {
    const author = await User.findOne({ _id: req.user.id });
    if (!author) {
      throw new Error('User is not found');
    }

    const room = await Room.findOne({ _id: roomId });

    if (!room) {
      return res.status(401).json({ message: 'Room is not found', isMember: false });
    }

    if (!room.members.includes(req.user.id)) {
      return res.status(401).json({ message: 'Not a member', isMember: false });
    }

    res.status(200).json({ message: 'Successfully joining the room', isMember: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
