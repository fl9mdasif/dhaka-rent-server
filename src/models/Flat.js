const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
    duration: String,
    location: String,
    bed: String,
    residentType: String,
    description: String,
    address: String,
    rent: String,
    area: String,
    securityDeposit: String,
    utilitiesIncluded: String,
    images: String, // For image1, image2, image3, image4
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Flat', flatSchema);
