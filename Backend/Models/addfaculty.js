const mongoose = require('mongoose');

const SectionBSchema = new mongoose.Schema({
  observations: { type: String, trim: true },
  recommendations: { type: String, trim: true },
});

const SectionCSchema = new mongoose.Schema({
  recommendation: { type: String, trim: true },
  signature: { type: String, trim: true },
});

const FacultySchema = new mongoose.Schema({
  title: { type: String, enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'], trim: true },
  firstName: { type: String, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  phone:{ type: String, unique: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
  dateOfBirth: { type: Date },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, trim: true },
  zipcode: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  departmentName: { type: String, trim: true },
  facultyId: { type: String, unique: true, trim: true },
  dateOfJoining: { type: Date },
  designation: { type: String, trim: true },
  facultyEmail: { type: String, trim: true },
  educationQualification: { type: String, trim: true },
  areasOfSpecialization: { type: [String] },
  experiences: { type: Number, min: 0 },
  employeeType: { type: String, enum: ['Permanent', 'Contract', 'Part-Time'], trim: true },
  password: { type: String },

  teachingProcess: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    scheduledClasses: { type: Number },
    actualClasses: { type: Number },
    document: { type: String },
    score: { type: Number}
  }],

  studentsFeedback: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    studentFeedback: { type: String },
    pointsEarned: { type: Number },

    document: { type: String },
    score: { type: Number}

  }],

  departmentActivities: [{
    semester: { type: String },
    activity: { type: String },
    pointsEarned: { type: Number },
    criteria: { type: String },
    document: { type: String },
    score: { type: Number}
  }],

  instituteActivities: [{
    semester: { type: String },
    activity: { type: String },
    pointsEarned: { type: Number },
    criteria: { type: String },
    document: { type: String },
    score: { type: Number}
  }],

  resultSummary: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    noRegisteredStudents: { type: Number },
    noPassedStudents: { type: Number },
    result: { type: Number },

    document: { type: String },
    score: { type: Number}

  }],

  research: [{
    research: { type: String },
    publicationName: { type: String },
    category: { type: String },
    document: { type: String },
    creditPoint: { type: Number },
    score: { type: Number}
  }],

  contributionSociety: [{
    semester: { type: String },
    activity: { type: String },
    criteria: { type: String },
    pointsEarned: { type: Number },
    document: { type: String },
    score: { type: Number}
  }],

  sectionB: [SectionBSchema],
  sectionC: [SectionCSchema],

}, { timestamps: true });

const Faculty = (db) => {
  return db.model('Faculty', FacultySchema);
};

module.exports = Faculty;
