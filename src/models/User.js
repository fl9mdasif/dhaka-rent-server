const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    favoriteFlats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: false }],
});

module.exports = mongoose.model('User', userSchema);
