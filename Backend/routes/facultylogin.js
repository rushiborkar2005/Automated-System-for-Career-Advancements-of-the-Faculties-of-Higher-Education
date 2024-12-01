const express = require('express');
const router = express.Router();
const Faculty = require('../Models/addfaculty');
const {
    getdb
} = require('../Module/db')
const Institute = require('../Models/Institute')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
router.post('/facultylogin', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const emaildomain = email.split('@')[1];
    const institute = await Institute.findOne({
        'contact.emaildomain': emaildomain
    }).select('basicInfo.instituteName');
    const institute_name = institute.basicInfo.instituteName;
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const faculty = Faculty(fdb);
    try {
        const user = await faculty.findOne({
            'facultyEmail': email
        });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        const isMatch = user.password === password ? 1 : 0;
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        const token = jwt.sign({
            userId: user._id,
            db: institute_name.replace(/[^a-zA-Z0-9]/g, '_')
        }, JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({
            message: 'Login successful!',
            token,
            ok: 1
        });
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});
module.exports = router;