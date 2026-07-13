const User = require('../models/User');

// Register or toggle permanent volunteer status
exports.registerVolunteer = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            // Toggle permanent volunteer status
            user.isPermanentVolunteer = !user.isPermanentVolunteer;
            await user.save();
            return res.status(200).json({
                success: true,
                message: user.isPermanentVolunteer ? "You are now a Permanent Volunteer!" : "Permanent volunteer status removed.",
                user
            });
        }

        // New user — register as permanent volunteer
        user = new User({
            name,
            email: email.toLowerCase(),
            isPermanentVolunteer: true
        });
        await user.save();
        res.status(201).json({ success: true, message: "Registered as Permanent Volunteer!", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all permanent volunteers (for admin)
exports.getVolunteers = async (req, res) => {
    try {
        const volunteers = await User.find({ isPermanentVolunteer: true }).sort({ joinedAt: -1 });
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if a specific user is a permanent volunteer
exports.checkVolunteer = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email.toLowerCase() });
        res.status(200).json({
            isVolunteer: user ? user.isPermanentVolunteer : false,
            user: user || null
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
