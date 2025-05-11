import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.models.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const existedUser = await User.findOne({ email });
        if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
    
  }

})

