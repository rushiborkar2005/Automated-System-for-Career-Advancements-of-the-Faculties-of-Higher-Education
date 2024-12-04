const express = require('express');
const Institute = require('../Models/Institute');
const Faculty = require('../Models/addfaculty');
const multer = require("multer");
const jwt = require('jsonwebtoken');
const  { uploadFileToDrive }=require('../Module/multer')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
const upload = multer({ dest: 'uploads/' });
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
    const password = generatePassword();

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
      password
    });
    const savedFaculty = await newFaculty.save();
    sendPasswordEmail(newFaculty.facultyEmail, password);
    res.status(201).json({
      message: 'Faculty added successfully',
      faculty: savedFaculty,
    });
  } catch (error) {
    
    res.status(500).json({
      message: 'Error adding faculty',
      error: error.message,
    });
  }
});
  router.post('/add-details', async (req, res) => {

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
  
  const token = req.headers.authorization;
  
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const fdb = getdb(decoded.db);
    const FacultyModel = Faculty(fdb);
    // Find the faculty by ID
    const faculty = await FacultyModel.findOne({ _id: user});
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    console.log(data);
    if (data.t==='0') {
      
      faculty.teachingProcess.push(data);
    }
    if (data.t==='1') {

      faculty.studentsFeedback.push(data);
    }
    if (data.t==='2') {
      faculty.departmentActivities.push(data);
    }
    if (data.t==='3') {
      faculty.instituteActivities.push(data);
    }
    if (data.t==='4') {
      faculty.resultSummary.push(data);
    }
    if (data.t==='6') {
      faculty.research.push(data);
    }
    if (data.t==='5') {
      faculty.contributionSociety.push(data);
    }
    // Save the updated document
    await faculty.save();
    res.status(200).json({
      message: 'Details added successfully',
      faculty,
    });
  } catch (error) {
    
    res.status(500).json({
      message: 'Error updating details',
      error: error.message,
    });
  }
});




router.get('/faculty-list', async (req, res) => {

  const token = req.headers.authorization;
  console.log(token)
  
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const institute_name = user.basicInfo.instituteName;
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const FacultyModel = Faculty(fdb);
    // Find the faculty by ID
    const faculty = await FacultyModel.find();
    console.log(faculty);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
res.status(200).json(faculty);
}catch(error)
{

}
}
);

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
//     
//     res.status(500).json({
//       message: 'Error adding faculty',
//       error: error.message,
//     });
//   }
// });
// module.exports = router;






