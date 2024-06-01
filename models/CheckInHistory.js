const mongoose = require('mongoose');
const Counter = require('./Counter');

const checkInHistorySchema = new mongoose.Schema({
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
  checkInType: {
    type: String,
    enum: ['มา', 'ไม่มา'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

checkInHistorySchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'checkInHistoryId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

const CheckInHistory = mongoose.models.CheckInHistory || mongoose.model('CheckInHistory', checkInHistorySchema);

module.exports = CheckInHistory;
