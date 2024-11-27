const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String,  },
  hodFirstName: { type: String,  },
  hodMiddleName: { type: String }, // Optional
  hodLastName: { type: String,  },
  departmentPhone: { type: String,  },
  facultyIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddFaculty', // Reference to the AddFaculty model
    }
  ]
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
