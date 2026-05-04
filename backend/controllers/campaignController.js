const Campaign = require('../models/Campaign');

const AUTHORIZED_ADMIN = "vanshikarao.c@gmail.com";

exports.createCampaign = async (req, res) => {
    try {
        const { title, description, domain, imageUrl, adminEmail } = req.body;
        const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
        const isAdmin = adminEmail && adminEmail.toLowerCase() === AUTHORIZED_ADMIN.toLowerCase();

        if (!isAdmin && !isLocal) {
            return res.status(403).json({ message: "Unauthorized Admin Access" });
        }

        const campaign = new Campaign({
            title,
            description,
            domain,
            imageUrl: imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
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