const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isPermanentVolunteer: { type: Boolean, default: false },
  phone: { type: String },
  address: { type: String },
  skills: { type: String },
  availability: { type: String },
  bloodGroup: { type: String },
  dob: { type: String },
  idProof: { type: String },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);