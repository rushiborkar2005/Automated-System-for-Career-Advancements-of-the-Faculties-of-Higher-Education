
const express = require('express');
const mongoose = require('mongoose');
const Faculty = require('../Models/addfaculty'); 
// const Department = require('../models/department'); 
const { verifyToken } = require('../Module/auth');
const router = express.Router();


router.post('/addFaculty',verifyToken ,async (req, res) => {
  try {
    
    const {
      title,
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      zipcode,
      state,
      country,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
      educationQualification,
      areasOfSpecialization,
      experiences,
      employeeType,
    } = req.body;

    
    // const department = await Department.findById(departmentId);
    // if (!department) {
    //   return res.status(404).json({ message: 'Department not found' });
    // }

    
    const newFaculty = new Faculty({
      title,
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      zipcode,
      state,
      country,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
      educationQualification,
      areasOfSpecialization,
      experiences,
      employeeType,
      
    });

    
    const savedFaculty = await newFaculty.save();

    
    // department.facultyIds.push(savedFaculty._id);
    // await department.save();

    
    res.status(201).json({
      message: 'Faculty added successfully',
      faculty: savedFaculty,
      // updatedDepartment: department,
    });
  } catch (error) {
    
    console.error('Error adding faculty:', error.message);
    res.status(500).json({
      message: 'Error adding faculty',
      error: error.message,
    });
  }
});

// module.exports = router;


// const express = require('express');
// const router = express.Router(); 

// const bodyParser = require('body-parser');
// router.use(bodyParser.json());

// const addfaculty = require('../Models/addfaculty'); 


// router.post('/addfaculty', async (req, res) => {
//   try {
//     console.log(req.body);
//     const data = req.body; 

    
//     const newFaculty = new addfaculty(data);

    
//     const response = await newFaculty.save();
//     console.log('Data saved');
//     res.status(200).json(response);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' }); 
//   }
// });

module.exports = router;




