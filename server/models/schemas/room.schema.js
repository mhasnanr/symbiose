const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicity: {
      type: String,
      required: false,
      default: 'public',
      enum: ['public', 'private'],
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
      enum: ['open', 'in_game', 'closed'],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = roomSchema;
