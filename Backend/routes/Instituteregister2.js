const express = require('express');
const bcrypt = require('bcryptjs');
const Institute = require('../Models/Institute');
const { verifyToken } = require('../Module/auth');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
const router = express.Router();
router.post('/register', verifyToken, async (req, res) => {
  
    try {
      const { userId } = req.user;
      const {
        instituteName,
        instituteType,
        registrationNumber,
        yearOfEstablishment,
        address,
        city,
        state,
        postalCode,
        contactNumber,
        email,
        website,
        principalName,
        principalPhone,
        principalEmail,
        adminContact,
        affiliatingBody,
        accreditationBody,
        accreditationGrade,
      } = req.body;
     
      const institute = await Institute.findById(req.user);
      if (!institute) {
        return res.status(404).json({ message: 'Institute not found.', ok: 0 });
      }
      institute.basicInfo = {
        instituteName,
        instituteType,
        registrationNumber,
        yearOfEstablishment,
      };
      institute.address = {
        street: address,
        city,
        state,
        postalCode,
      };
      institute.contact = {
        contactNumber,
        email,
        website,
      };
      institute.adminDetails = {
        principalName,
        principalContact: {
          phone: principalPhone,
          email: principalEmail,
        },
        additionalAdminContact: {
          name: adminContact,
          phone: '', 
          email: '', 
        },
      };
      institute.affiliation = {
        affiliatingBody,
        accreditation: {
          body: accreditationBody,
          grade: accreditationGrade,
        },
      };
      console.log('1')
      
      await institute.save();
      console.log('1')
      res.status(200).json({ message: 'Institute data updated successfully!', ok: 1 });
    } catch (error) {
      console.log(error,'2')
      res.status(500).json({ message: 'Server error, please try again later.', ok: 0 });
    }
  });




  router.post('/department',verifyToken,async () => {

    const institute = await Institute.findById(req.user);
      if (!institute) {
        return res.status(404).json({ message: 'Institute not found.', ok: 0 });
      }

      institute.department.push(req.body);


    
  })
module.exports = router;