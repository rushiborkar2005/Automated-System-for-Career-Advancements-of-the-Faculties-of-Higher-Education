const axios = require('axios');
const mongoose = require('mongoose');
const {db,getdb}=require('./db');

// MongoDB Schema for Faculty (Assuming it's already defined)
const Faculty = require('../Models/addfaculty')

// Function to update existing data
const updateFacultyData = async (facultyd) => {
  try {

            const faculty=Faculty(getdb('Bajaj_Institute_of_Technology'));
            console.log(faculty);
    const existingData = await faculty.findOne({    _id: '67517294d48b85a4c1c3c80c' });

    if (!existingData) {
      console.log("Faculty not found.");
      return;
    }

    // Fetch new data from API
    const response = await axios.get(`http://localhost:3000/api/faculty/FAC123456`);
    const fetchedData = response.data;

    // Update empty fields
    for (let key in fetchedData) {
      if (Array.isArray(fetchedData[key])) {
        // For arrays, append unique objects
        fetchedData[key].forEach((newItem) => {
          const existingArray = existingData[key] || [];
          const isDuplicate = existingArray.some((item) =>
            JSON.stringify(item) === JSON.stringify(newItem)
          );
          if (!isDuplicate) {
            newItem['erp']=true;
            existingArray.push(newItem);
            ;
          }
          existingData[key] = existingArray;
        });
      } else if (!existingData[key]) {
        // For non-array fields, update only if empty
        existingData[key] = fetchedData[key];
      }
    }

    // Save updated data to MongoDB
    await existingData.save();

    console.log("Updated Faculty Data:", existingData);
  } catch (error) {
    console.error("Error fetching or updating data:", error.message);
  }
};

// Call the function to update data for a specific faculty ID
updateFacultyData("FAC123456");
