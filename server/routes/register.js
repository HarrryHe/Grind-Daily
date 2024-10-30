const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

//Without Auto-Login feature (user need to go back to login after registered)
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

        res.status(201).json({ message: 'User registered successfully', userId: newUser._id, userName:newUser.username, userEmail:newUser.email});

    }catch(error) {
        return res.status(400).json({ error: "Failed Creating User"});
    }

})

module.exports = router;

