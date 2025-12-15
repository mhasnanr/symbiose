const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerStateSchema = new Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
    state: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = playerStateSchema;
