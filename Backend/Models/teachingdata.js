const mongoose = require('mongoose');

const FacultyEntrySchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Assuming subject codes are unique
  },
  semester: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'], // Valid semesters
  },
  scheduledClasses: {
    type: Number,
    required: true,
    min: 0, // Ensures no negative numbers
  },
  actualClasses: {
    type: Number,
    required: true,
    min: 0, // Ensures no negative numbers
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('FacultyEntry', FacultyEntrySchema);
