const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameStateSchema = new Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    status: {
      type: String,
      enum: ['waiting', 'preparing', 'in_progress', 'finished'],
      default: 'waiting',
    },
    // nyimpen deck tengah
    river: {
      type: Array,
      required: false,
      default: [],
    },
    // kartu sisa di deck
    remainingDeck: {
      type: Array,
      required: false,
      default: [],
    },
    // nyimpen giliran pemain
    activePlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
      default: null,
    },
    turnOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = gameStateSchema;
