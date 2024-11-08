const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Number, enum: [1, 2, 3], default: 2 } // Status: 1 = accepted, 2 = requested, 3 = declined
});

module.exports = mongoose.model('Friend', friendSchema);