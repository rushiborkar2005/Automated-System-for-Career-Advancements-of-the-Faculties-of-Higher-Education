const express = require('express');
const router = express.Router();
const {Faculty}=require('../Models/addfaculty')

router.post('/facultylogin', async (req, res) => {
    const { email, password } = req.body;
    const emailDomain = email.split('@')[1];

    const institute = await Institute.findOne({ emailDomain }).select('basicInfo.instituteName');
    const institute_name = institute.basicInfo.instituteName;
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const faculty = Faculty(fdb);


    try {
        const user = await faculty.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = user.password===password?1:0;
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id ,domain: emailDomain}, JWT_SECRET, { expiresIn: '1h' });

        // res.cookie('authToken', token, {
        //     httpOnly: true,    
        //     secure: process.env.NODE_ENV === 'production', 
        //     maxAge: 3600000,  
        //     sameSite: 'Strict'
        // });

        res.json({ message: 'Login successful!',token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports =router;