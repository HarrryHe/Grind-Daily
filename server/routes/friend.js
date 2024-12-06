const express = require('express');
const Friend = require('../models/friend');
const User = require('../models/user');
const router = express.Router();

// Send Friend Request
router.post('/request', async (req, res) => {
    const { userId1, userId2 } = req.body;

    try {
        // Check if the friendship already exists
        const existingFriendRequest = await Friend.findOne({ userId1, userId2 });
        if (existingFriendRequest) {
            return res.status(400).json({ error: "Friend request already exists" });
        }

        // Create a new friend request
        const friendRequest = new Friend({
            userId1,
            userId2,
            status: 2 // Status 2 for "requested"
        });

        await friendRequest.save();
        res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send friend request" });
    }
});

// Accept Friend Request
router.post('/accept', async (req, res) => {
    const { userId1, userId2 } = req.body;

    try {
        // Find the friend request
        const friendRequest = await Friend.findOne({
            $or: [
                { userId1, userId2, status: 2 },
                { userId1: userId2, userId2: userId1, status: 2 }
            ]
        });
        if (!friendRequest) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        // Update the friend request status to accepted
        friendRequest.status = 1; // Status 1 for "accepted"
        await friendRequest.save();

        // Add each user to the other's friend list
        await User.findByIdAndUpdate(userId1, { $push: { friends: userId2 } });
        await User.findByIdAndUpdate(userId2, { $push: { friends: userId1 } });

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to accept friend request" });
    }
});

// Decline Friend Request
router.post('/decline', async (req, res) => {
    const { userId1, userId2 } = req.body;

    try {
        // Find the friend request
        const friendRequest = await Friend.findOne({
            $or: [
                { userId1, userId2, status: 2 },
                { userId1: userId2, userId2: userId1, status: 2 }
            ]
        });
        if (!friendRequest) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        // Update the friend request status to declined
        friendRequest.status = 3; // Status 3 for "declined"
        await friendRequest.save();

        res.status(200).json({ message: "Friend request declined" });
    } catch (error) {
        res.status(500).json({ error: "Failed to decline friend request" });
    }
});

// View Friends List
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('friends', 'username email avatarUrl');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ friends: user.friends });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve friends list' });
    }
});

router.get('/pending/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const pendingRequests = await Friend.find({
            userId2: userId,
            status: 2,
        }).populate('userId1 userId2', 'username email avatarUrl');

        if (!pendingRequests || pendingRequests.length === 0) {
            return res.status(200).json({ message: "No pending friend requests", pending: [] });
        }

        const formattedRequests = pendingRequests.map((request) => {
            const isRequester = request.userId1._id.toString() === userId;
            const friendData = isRequester ? request.userId2 : request.userId1;
            return {
                id: friendData._id,
                username: friendData.username,
                email: friendData.email,
                avatarUrl: friendData.avatarUrl,
                status: "Pending",
            };
        });

        res.status(200).json({ pending: formattedRequests });
    }
    catch (error) {
        console.error('Error fetching pending friend requests:', error.message);
        res.status(500).json({ error: "Failed to fetch pending friend requests" });
    }
});

module.exports = router;