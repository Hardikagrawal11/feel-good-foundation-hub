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
  participants: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);