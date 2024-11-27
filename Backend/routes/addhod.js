const express = require('express');
const mongoose = require('mongoose');
const HOD = require('./path/to/your/hod/model'); // Update the path as needed

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// POST route to add HOD details
app.post('/api/hod', async (req, res) => {
  try {
    // Destructure body to ensure only relevant fields are passed
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
      teachingProcess,
      studentsFeedback,
      departmentActivities,
      instituteActivities,
      resultSummary,
      research,
      contributionSociety,
      sectionB,
      sectionC
    } = req.body;

    // Create a new HOD document
    const newHOD = new HOD({
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
      teachingProcess,
      studentsFeedback,
      departmentActivities,
      instituteActivities,
      resultSummary,
      research,
      contributionSociety,
      sectionB,
      sectionC
    });

    // Save the document to the database
    const savedHOD = await newHOD.save();

    // Respond with the saved document
    res.status(201).json({
      message: 'HOD details added successfully',
      data: savedHOD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add HOD details',
      error: error.message
    });
  }
});