const express = require('express');
const Institute = require('../Models/Institute');
const Faculty = require('../Models/addfaculty');
const {
  verifyToken,
  generatePassword,
} = require('../Module/auth');
const { getdb } = require('../Module/db');
const sendPasswordEmail = require('../Module/mail');

const router = express.Router();

// Add a new faculty
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
    const institute_name = institute.basicInfo.instituteName;
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
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

    const tpassword = generatePassword();
    sendPasswordEmail(newFaculty.facultyEmail, tpassword);

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

// Add details to existing faculty
router.post('/add-details/:facultyId', verifyToken, async (req, res) => {
  const { facultyId } = req.params;
  // const {
  //   teachingProcess,
  //   studentsFeedback,
  //   departmentActivities,
  //   instituteActivities,
  //   resultSummary,
  //   research,
  //   contributionSociety,
  // } = req.body;


  const data = req.body

  try {
    const institute = await Institute.findOne({ _id: req.user }).select('basicInfo.instituteName');
    const institute_name = institute.basicInfo.instituteName;
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const FacultyModel = Faculty(fdb);

    // Find the faculty by ID
    const faculty = await FacultyModel.findOne({ facultyId });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    // Update the arrays
    if (data.t===0) {
      faculty.teachingProcess.push(...teachingProcess,data);
    }
    if (data.t===1) {
      faculty.studentsFeedback.push(...studentsFeedback,data);
    }
    if (data.t===2) {
      faculty.departmentActivities.push(...departmentActivities,data);
    }
    if (data.t===3) {
      faculty.instituteActivities.push(...instituteActivities,data);
    }
    if (data.t===4) {
      faculty.resultSummary.push(...resultSummary,data);
    }
    if (data.t===5) {
      faculty.research.push(...research,data);
    }
    if (data.t===6) {
      faculty.contributionSociety.push(...contributionSociety,data);
    }

    // Save the updated document
    await faculty.save();

    res.status(200).json({
      message: 'Details added successfully',
      faculty,
    });
  } catch (error) {
    console.error('Error updating details:', error.message);
    res.status(500).json({
      message: 'Error updating details',
      error: error.message,
    });
  }
});

module.exports = router;

// const express = require('express');
// const Institute=require('../Models/Institute')
// const Faculty = require('../Models/addfaculty');
// const {
//   verifyToken,generatePassword
// } = require('../Module/auth');
// const {getdb}=require('../Module/db');
// const sendPasswordEmail = require('../Module/mail');
// const router = express.Router();
// router.post('/addFaculty', verifyToken, async (req, res) => {
//   try {
//     const {
//       title,
//       firstName,
//       middleName,
//       lastName,
//       gender,
//       dateOfBirth,
//       address,
//       city,
//       zipcode,
//       state,
//       country,
//       departmentName,
//       facultyId,
//       dateOfJoining,
//       designation,
//       facultyEmail,
//       educationQualification,
//       areasOfSpecialization,
//       experiences,
//       employeeType,
//     } = req.body;


//     const institute = await Institute.findOne({ _id: req.user }).select('basicInfo.instituteName');
//     const institute_name=institute.basicInfo.instituteName;
//     const fdb=getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
//     const FacultyModel = Faculty(fdb);

//     const password=generatePassword();
//     const newFaculty = new FacultyModel({
//       title,
//       firstName,
//       middleName,
//       lastName,
//       gender,
//       dateOfBirth,
//       address,
//       city,
//       zipcode,
//       state,
//       country,
//       departmentName,
//       facultyId,
//       dateOfJoining,
//       designation,
//       facultyEmail,
//       educationQualification,
//       areasOfSpecialization,
//       experiences,
//       employeeType,
//       password
//     });
//     const savedFaculty = await newFaculty.save();




// sendPasswordEmail(newFaculty.facultyEmail,password);



//     res.status(201).json({
//       message: 'Faculty added successfully',
//       faculty: savedFaculty,
//     });
//   } catch (error) {
//     console.error('Error adding faculty:', error.message);
//     res.status(500).json({
//       message: 'Error adding faculty',
//       error: error.message,
//     });
//   }
// });
// module.exports = router;