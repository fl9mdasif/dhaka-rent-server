const Flat = require('../models/Flat');

// Create a flat
exports.createFlat = async (req, res) => {
    try {
        const newFlat = new Flat(req.body);
        await newFlat.save();
        res.status(201).json(newFlat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// Backend: Controller Function for Filtering Flats
exports.getFlats = async (req, res) => {
    const { duration, location, residentType, rent } = req.query;

    try {
        const query = {};

        if (duration) query.duration = { $regex: new RegExp(duration, "i") }; // Case-insensitive regex
        if (location) query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive regex
        if (residentType) query.residentType = { $regex: new RegExp(residentType, "i") }; // Case-insensitive regex
        if (rent) query.rent = { $lte: rent }; // Match flats with rent <= provided amount

        const flats = await Flat.find(query);

        res.status(200).json(flats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// get single flat 
exports.getSingleFlat = async (req, res) => {
    try {
        const flats = await Flat.findOne({ _id: req.params.id });
        res.json(flats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a flat
exports.updateFlat = async (req, res) => {
    try {
        const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(flat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a flat
exports.deleteFlat = async (req, res) => {
    try {
        await Flat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Flat deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
