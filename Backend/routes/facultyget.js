const express = require('express');
const Faculty = require('../Models/addfaculty');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { getdb } = require('../Module/db');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
router.get('/get-details', async (req, res) => {
    const token = req.headers.authorization;
    const t = req.headers['type'];
    
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);
      const faculty = await FacultyModel.findOne({ _id: user});
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      
      if (t==='0') {
       res.json({ key: faculty.teachingProcess });
      }
      if (t==='1') {
       res.json({ key: faculty.studentsFeedback });
      }
      if (t==='2') {
        res.json({ key: faculty.departmentActivities });
      }
      if (t==='3') {
        res.json({ key: faculty.instituteActivities });
      }
      if (t==='4') {
        res.json({ key: faculty.resultSummary });
      }
      if (t==='6') {
        res.json({ key: faculty.research });
      }
      if (t==='5') {
        res.json({ key: faculty.contributionSociety });
      }
      if(t==='7')
      {
        res.json({ key: faculty });
      }
  });
  module.exports = router;





  router.delete('/delete-details/:entryId', async (req, res) => {
    const { entryId } = req.params; // 
  
    try {
      // Update the faculty document, pulling the specific entry from the "teachingProcess" array



      const token = req.headers.authorization;
    const t = req.headers['type'];
    
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);
      const faculty = await FacultyModel.findOne({ _id: user});
      const result = await faculty.updateOne(
        { $pull: { teachingProcess: { _id: entryId } } } // Pull entry with the specific `id` from the array
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).send({ message: 'Entry not found' });
      }
  
      res.send({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).send({ message: 'Failed to delete entry' });
    }
  });
  
