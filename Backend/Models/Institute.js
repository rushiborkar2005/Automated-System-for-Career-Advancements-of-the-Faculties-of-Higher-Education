const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  login: {
    username: { type: String, unique: true },
    password: { type: String }, 
  },
  st1: { type: Boolean, default: false },
  basicInfo: {
    instituteName: { 
      type: String, 
      
    },
    instituteType: { 
      type: String, 
      enum: ['school', 'college', 'university'],
      
    },
    registrationNumber: { 
      type: String, 
      
    },
    yearOfEstablishment: { 
      type: Number, 
      
    },
  },
  address: {
    street: { type: String },
    city: { 
      type: String,
      
    },
    state: { 
      type: String, 
      
    },
    postalCode: { 
      type: String, 
      
    },
  },
  contact: {
    contactNumber: { 
      type: String, 
      
    },
    email: { 
      type: String, 
      
    },
    website: { type: String }, 
  },
  adminDetails: {
    principalName: { 
      type: String, 
      
    },
    principalContact: {
      phone: { 
        type: String, 
        
      },
      email: { 
        type: String, 
        
      },
    },
    additionalAdminContact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
  },
  affiliation: {
    affiliatingBody: { 
      type: String, 
      
    },
    accreditation: {
      body: { type: String },
      grade: { type: String },
    },
  },
  uploadedDocuments: {
    registrationCertificate: { type: String },
    affiliationCertificate: { type: String },
    principalIDProof: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  
  department: [String]  
  });


  const myDatabase = mongoose.connection.useDb('Institute-Details');
  const Institute = myDatabase.model('Institute', instituteSchema);

module.exports =Institute;