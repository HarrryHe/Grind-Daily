const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: {type: Number, required: true },
    generatedBy: { type: String, enum: ['user', 'system'], required: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);