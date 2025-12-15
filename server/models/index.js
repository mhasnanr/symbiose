const mongoose = require('mongoose');
const userSchema = require('./schemas/user.schema');
const roomSchema = require('./schemas/room.schema');
const gameStateSchema = require('./schemas/game-state.schema');
const playerStateSchema = require('./schemas/player-state.schema');

exports.User = mongoose.model('User', userSchema);
exports.Room = mongoose.model('Room', roomSchema);
exports.Game = mongoose.model('Game', gameStateSchema);
exports.Player = mongoose.model('Player', playerStateSchema);
