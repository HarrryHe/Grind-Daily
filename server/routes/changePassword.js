const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        // Enter new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        user.password = hashedNewPassword;
        await user.save();

        // Respond
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Password change failed" });
    }
});

module.exports = router;