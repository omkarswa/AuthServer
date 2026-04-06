const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic password length validation (8-digit/character)
        if (!password || password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                message: 'User registered successfully!',
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};

// @desc    Auth user & return success
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (user && (await user.comparePassword(password))) {
            res.json({
                message: 'Login successful!',
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
};
