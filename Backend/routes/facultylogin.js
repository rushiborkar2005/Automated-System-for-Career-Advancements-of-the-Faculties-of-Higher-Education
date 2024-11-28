const express = require('express');
const router = express.Router();
const faculty=require('../Models/addfaculty')

router.post('/facultylogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await faculty.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = user.password===password?1:0;
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,    
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000,  
            sameSite: 'Strict'
        });

        res.json({ message: 'Login successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports =router;