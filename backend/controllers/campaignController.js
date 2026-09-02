const Campaign = require('../models/Campaign');

const AUTHORIZED_ADMIN = "vanshikarao.c@gmail.com";

exports.createCampaign = async (req, res) => {
    try {
        const { title, description, domain, imageUrl, adminEmail, isEvent, date, time, location, isLive } = req.body;
        const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
        const isAdmin = adminEmail && adminEmail.toLowerCase() === AUTHORIZED_ADMIN.toLowerCase();

        if (!isAdmin && !isLocal) {
            return res.status(403).json({ message: "Unauthorized Admin Access" });
        }

        const campaign = new Campaign({
            title,
            description,
            domain,
            imageUrl: imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
            isEvent: isEvent || false,
            date: date || "",
            time: time || "",
            location: location || "",
            isLive: isLive !== undefined ? isLive : true
        });

        await campaign.save();
        res.status(201).json({ success: true, message: "Campaign Published!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- UPDATED GET METHOD FOR FILTERING ---
exports.getCampaigns = async (req, res) => {
    try {
        const { domain } = req.query; // Grabs ?domain=... from the URL
        
        // Use a Case-Insensitive regex for matching to avoid "Blood" vs "blood" issues
        const filter = domain ? { domain: { $regex: new RegExp(`^${domain}$`, 'i') } } : {};
        
        const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- UPDATE CAMPAIGN ---
exports.updateCampaign = async (req, res) => {
    try {
        const { title, description, domain, imageUrl, adminEmail, isEvent, date, time, location, isLive } = req.body;
        const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
        const isAdmin = adminEmail && adminEmail.toLowerCase() === AUTHORIZED_ADMIN.toLowerCase();

        if (!isAdmin && !isLocal) {
            return res.status(403).json({ message: "Unauthorized Admin Access" });
        }

        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            { title, description, domain, imageUrl, isEvent, date, time, location, isLive },
            { new: true, runValidators: true }
        );

        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json({ success: true, message: "Campaign Updated!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- DELETE CAMPAIGN ---
exports.deleteCampaign = async (req, res) => {
    try {
        const { adminEmail } = req.body;
        const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
        const isAdmin = adminEmail && adminEmail.toLowerCase() === AUTHORIZED_ADMIN.toLowerCase();

        if (!isAdmin && !isLocal) {
            return res.status(403).json({ message: "Unauthorized Admin Access" });
        }

        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json({ success: true, message: "Campaign Deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- JOIN CAMPAIGN (add user as participant) ---
exports.joinCampaign = async (req, res) => {
    try {
        const { email, name, phone } = req.body;
        if (!email || !name || !phone) return res.status(400).json({ message: "Name, email, and phone are required" });

        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        if (campaign.isEvent && campaign.isLive === false) {
            return res.status(400).json({ message: "This event is currently closed." });
        }

        // Check if already joined (handle both old string format and new object format)
        const alreadyJoined = campaign.participants.some(p => 
            (typeof p === 'string' && p.toLowerCase() === email.toLowerCase()) || 
            (p.email && p.email.toLowerCase() === email.toLowerCase())
        );

        if (alreadyJoined) {
            return res.status(400).json({ message: "Already joined" });
        }

        campaign.participants.push({ name, email: email.toLowerCase(), phone });
        await campaign.save();

        res.status(200).json({ success: true, message: "Joined campaign!", participantCount: campaign.participants.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- LEAVE CAMPAIGN (remove user from participants) ---
exports.leaveCampaign = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        // Filter out both old string format and new object format
        campaign.participants = campaign.participants.filter(p => {
            if (typeof p === 'string') return p.toLowerCase() !== email.toLowerCase();
            if (p.email) return p.email.toLowerCase() !== email.toLowerCase();
            return true;
        });

        await campaign.save();

        res.status(200).json({ success: true, message: "Left campaign.", participantCount: campaign.participants.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};