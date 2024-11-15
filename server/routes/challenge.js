const User = require('../models/user');
const Comment = require('../models/comment');
const Challenge = require('../models/task');
const express = require('express');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const challenges = await Challenge.find({userId});
        if(!challenges) {
            console.log('user: ' + userId + 'does not have any challenge histories');
            res.json({});
            return;
        }

        if (challenges.length === 0) {
            console.log('user: ' + userId + ' does not have any challenge histories');
            res.json({ message: 'No challenge histories found for user', challenges: [] });
            return;
        }

        res.json({message: "User information fetched successfully", challenges:challenges});

    }catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to retrieve user information' });
    }
})

router.post('/', async (req, res) => {
    const { userId, title, genre, description, duration, difficulty, generatedBy } = req.body;

    try {
        const newChallenge = new Challenge({
            userId,
            title,
            genre,
            description,
            duration,
            difficulty,
            generatedBy
        });

        await newChallenge.save();

        res.status(201).json({ message: 'Challenge saved successfully', challenge: newChallenge });
    } catch (error) {
        console.error('Error saving challenge:', error);
        res.status(500).json({ error: 'Failed to save challenge' });
    }
});
