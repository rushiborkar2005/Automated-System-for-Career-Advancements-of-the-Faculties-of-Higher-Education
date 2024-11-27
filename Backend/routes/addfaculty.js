const express = require('express');
const Institute=require('../Models/Institute')
const Faculty = require('../Models/addfaculty');
const {
  verifyToken,generatePassword
} = require('../Module/auth');
const {getdb}=require('../Module/db');
const sendPasswordEmail = require('../Module/mail');
const router = express.Router();
router.post('/addFaculty', verifyToken, async (req, res) => {
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


    const institute = await Institute.findOne({ _id: req.user }).select('basicInfo.instituteName');
    const institute_name=institute.basicInfo.instituteName;
    const fdb=getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const FacultyModel = Faculty(fdb);


    const newFaculty = new FacultyModel({
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


const tpassword=generatePassword();

sendPasswordEmail(newFaculty.facultyEmail,tpassword);

    res.status(201).json({
      message: 'Faculty added successfully',
      faculty: savedFaculty,
    });
  } catch (error) {
    console.error('Error adding faculty:', error.message);
    res.status(500).json({
      message: 'Error adding faculty',
      error: error.message,
    });
  }
});
module.exports = router;