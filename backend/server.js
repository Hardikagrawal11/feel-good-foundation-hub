const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const campaignController = require('./controllers/campaignController');
const volunteerController = require('./controllers/volunteerController');

dotenv.config();
const app = express();

// --- CRITICAL INTEGRATION MIDDLEWARE ---
app.use(cors()); // Allows Frontend -> Backend communication
app.use(express.json()); // Allows Backend to READ the admin email you send

// --- API ENDPOINTS ---
app.post('/api/campaigns', campaignController.createCampaign);
app.get('/api/campaigns', campaignController.getCampaigns);
app.put('/api/campaigns/:id', campaignController.updateCampaign);
app.delete('/api/campaigns/:id', campaignController.deleteCampaign);
app.post('/api/campaigns/:id/join', campaignController.joinCampaign);
app.post('/api/campaigns/:id/leave', campaignController.leaveCampaign);

// --- VOLUNTEER ENDPOINTS ---
app.post('/api/volunteers', volunteerController.registerVolunteer);
app.get('/api/volunteers', volunteerController.getVolunteers);
app.get('/api/volunteers/:email', volunteerController.checkVolunteer);

// --- DB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 FGF Backend running on http://localhost:${PORT}`);
    console.log(`📡 Ready for Final Review & Deployment`);
});