const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: {type: String},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);