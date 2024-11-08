const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async(req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User Exist"});
        }

        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        //auto login
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT secret not set" });
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'User registered successfully', userId:newUser._id, userName:newUser.username, userEmail:newUser.email, token});

    }catch(error) {
        return res.status(400).json({ error: "Failed Creating User"});
    }

})

module.exports = router;

