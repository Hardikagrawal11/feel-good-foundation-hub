const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns } = require('../controllers/campaignController');

router.post('/', createCampaign); // POST /api/campaigns
router.get('/', getCampaigns);    // GET /api/campaigns

module.exports = router;