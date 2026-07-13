const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isPermanentVolunteer: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);