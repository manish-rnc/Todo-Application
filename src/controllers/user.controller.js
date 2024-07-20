import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {

    const { username, password } = req.body; 

    try {
        const user = await User.findOne({ username });
        if(user) {
            return res.status(400).json({ error: 'User already exists'});
        }
        const securePassword = await bcrypt.hash(password, 5);
        const newUser = new User({ username: username, password: securePassword});
        await newUser.save();
        res.status(201).json({ message: 'The user is successfully registered'});
    }
    catch(error) {
        res.status(500).json({ error: error.message});
    }

};

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ error: 'User does not exist'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({error: 'Invalid Credentials'});
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    }
    catch(error) {
        res.status(500).json({ error: error.message});
    }

};

export { register, login };
