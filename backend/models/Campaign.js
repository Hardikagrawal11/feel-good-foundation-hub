const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String,
    default: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
  },
  domain: { 
    type: String, 
    required: true,
    enum: [
      "Blood donation camp", 
      "Child and old age help", 
      "Women safety", 
      "Food Security", 
      "Community Development", 
      "Differently Abled Support", 
      "Women sanitary awareness"
    ] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);