const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage');

// Set up localStorage for Node.js
const localStorage = new LocalStorage('./scratch');
// const User = require('../models/User');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
const router = express.Router();
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.cookie('authToken', token, {
//             httpOnly: true,    
//             secure: process.env.NODE_ENV === 'production', 
//             maxAge: 3600000,  
//             sameSite: 'Strict'
//         });

//         res.json({ message: 'Login successful!' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


const verifyToken = (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = {router, verifyToken};