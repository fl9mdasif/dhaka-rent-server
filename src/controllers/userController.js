

const User = require('../models/User'); // Import your User model
const Flat = require('../models/Flat'); // Import your Flat model

// Add a flat to favorites
exports.addToFavorites = async (req, res) => {
    try {
        const { email, flatId } = req.body; // Extract userId and flatId from the request body
        console.log(req.body)
        // Find the user by userId
        const user = await User.findOne({ email });

        console.log(user)

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the flat exists
        const flat = await Flat.findById(flatId);
        if (!flat) return res.status(404).json({ message: 'Flat not found' });

        // Check if the flat is already in the user's favorites
        if (user.favoriteFlats.includes(flatId)) {
            return res.status(400).json({ message: 'Flat is already in favorites' });
        }

        // Add the flat ID to the user's favoriteFlats array
        user.favoriteFlats.push(flatId);
        await user.save(); // Save the updated user document

        res.status(200).json({
            message: 'Flat added to favorites successfully',
            favoriteFlats: user.favoriteFlats,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};



// Remove a flat from favorites
exports.removeFromFavorites = async (req, res) => {
    try {
        const { email, flatId } = req.body; // Extract userId and flatId from the request body

        // Find the user by userId
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the flat exists
        user.favoriteFlats = user.favoriteFlats.filter((id) => id.toString() !== flatId);
        await user.save();
        res.status(200).json({
            message: 'Remove flat from favorites successfully',
            favoriteFlats: user.favoriteFlats,
        });
        // res.json(user.favoriteFlats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.creatUser = async (req, res) => {
    // Check if user already exists
    const existingUser = await User.findOne({ emaill: req.body.email });


    try {
        if (existingUser) {
            return res.status(200).json({
                message: 'User already exists',

            });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.myProfile = async (req, res) => {
    const email = req.query.email; // Use query instead of body
    console.log('User email:', email);

    try {
        const myProfile = await User.findOne({ email }).populate('favoriteFlats');
        if (!myProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: {
                name: myProfile.name,
                email: myProfile.email,
                favoriteFlats: myProfile.favoriteFlats,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.myFavoriteFlats = async (req, res) => {
    const { email } = req.body;
    console.log('User email:', email);

    try {
        // Find the user by email and populate favoriteFlats
        const myProfile = await User.findOne({ email }).populate('favoriteFlats');

        if (!myProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user profile and their favorite flats
        res.status(200).json({
            user: {
                email: myProfile.email,
                favoriteFlats: myProfile.favoriteFlats,
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

