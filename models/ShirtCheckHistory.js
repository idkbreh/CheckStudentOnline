// models/ShirtCheckHistory.js
const mongoose = require('mongoose');
const Counter = require('./Counter');

const shirtCheckHistorySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  shirtStatus: {
    type: String,
    enum: ['เรียบร้อย', 'ไม่เรียบร้อย'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

shirtCheckHistorySchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'shirtCheckId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

const ShirtCheckHistory = mongoose.models.ShirtCheckHistory || mongoose.model('ShirtCheckHistory', shirtCheckHistorySchema);

module.exports = ShirtCheckHistory;
