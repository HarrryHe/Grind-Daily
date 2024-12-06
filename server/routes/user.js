const User = require('../models/user');
const Comment = require('../models/comment');
const Challenge = require('../models/task');
const express = require('express');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate({
            path: 'comments',
            populate: [
                {path: 'owner', select: 'username'},
                {path: 'guest', select: 'username avatarUrl'}
            ]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userInfo = {
            userId: user._id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            friends: user.friends,
            comments: user.comments
        }

        res.json({message: "User information fetched successfully", user:userInfo});

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to retrieve user information' });
    }
})

router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (e) {
        console.error('Error updating user details:', e);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

module.exports = router;
