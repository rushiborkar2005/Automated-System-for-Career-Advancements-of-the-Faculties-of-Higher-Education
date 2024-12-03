const express = require('express');
const mongoose = require('mongoose');
const Faculty  = require('../Models/addfaculty'); // Update the path as needed


const router = express();

// Retrieve all faculty records
router.get('/get-all-faculty', async (req, res) => {
    try {
      const db = mongoose.connection.useDb('Bajaj_Institute_of_Technology'); // Assuming `mongoose.connection` is your active DB
      const FacultyModel = Faculty(db); // Get the Faculty model instance
      const faculties = await FacultyModel.find();
      res.status(200).json(faculties);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      res.status(500).json({ message: 'Error fetching faculty data', error });
    }
  });

  module.exports = router;