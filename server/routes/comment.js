const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');

//store the comment information (where user can post their comment)
router.post('/', async (req, res) => {
    const { owner, guest, comment } = req.body;

    try {
        const newComment = new Comment({
            owner,
            guest,
            comment,
        });

        const savedComment = await newComment.save();
        await User.findByIdAndUpdate(owner, {
            $push: { comments: savedComment._id }
        });


        res.status(201).json({ message: 'Comment saved successfully', comment: savedComment });

    }catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to save comment information' });
    }
})

module.exports = router;