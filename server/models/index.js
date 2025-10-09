const mongoose = require('mongoose');
const userSchema = require('./schemas/user.schema');
const roomSchema = require('./schemas/room.schema');

exports.User = mongoose.model('User', userSchema);
exports.Room = mongoose.model('Room', roomSchema);
