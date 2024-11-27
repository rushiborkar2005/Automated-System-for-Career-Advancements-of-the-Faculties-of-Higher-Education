const express = require('express');
const mongoose = require('mongoose');
const Department = require('./models/department'); // Adjust the path as needed
const Institute = require('./models/institute'); // Adjust the path as needed

const router = express.Router();

// POST method to add a new department and link it to an institute
router.post('/addDepartment', async (req, res) => {
  try {
    // Extract department and institute details from the request body
    const {
      departmentName,
      hodFirstName,
      hodMiddleName,
      hodLastName,
      departmentPhone,
      facultyIds,
      instituteId, // ID of the institute to which the department belongs
    } = req.body;

    // Check if the institute exists
    const institute = await Institute.findById(instituteId);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    // Create a new department instance
    const newDepartment = new Department({
      departmentName,
      hodFirstName,
      hodMiddleName,
      hodLastName,
      departmentPhone,
      facultyIds,
    });

    // Save the department to the database
    const savedDepartment = await newDepartment.save();

    // Add the department ID to the institute's departmentIds array
    institute.departmentIds.push(savedDepartment._id);
    await institute.save();

    // Respond with success
    res.status(201).json({
      message: 'Department added successfully',
      department: savedDepartment,
      updatedInstitute: institute,
    });
  } catch (error) {
    // Handle errors
    console.error('Error adding department:', error.message);
    res.status(500).json({
      message: 'Error adding department',
      error: error.message,
    });
  }
});

module.exports = router;
