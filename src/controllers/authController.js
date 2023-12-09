const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password, name, age, gender, height, weight } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password, name, age, gender, height, weight });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };