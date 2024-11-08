const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT secret not set" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ userId:user._id, userName:user.username, userEmail:user.email, token, message: 'Login successful' });
    }catch (error) {
        res.status(400).json({ error: "Login failed" });
    }
})

module.exports = router;