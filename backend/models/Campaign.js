const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Campaign description is required']
  },
  domain: {
    type: String,
    required: [true, 'Domain type is required'],
    // Strict white-list matching your frontend structural components exactly
    enum: [
      "Blood Donation", 
      "Child Welfare", 
      "Elder Care", 
      "Food Security", 
      "Community Development", 
      "Differently Abled", 
      "Women Welfare",
      "Animal Welfare"
    ]
  },
  isEvent: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: ""
  },
  time: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  isLive: {
    type: Boolean,
    default: true
  },
  participants: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);