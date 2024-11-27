const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const addfacultyRoute = require('../routes/addfaculty'); 
// const submit=require('../routes/submit')
const app = express();
const Instituteregister=require('../routes/Instituteregister');
const IN=require('../routes/Instituteregister2');
const InLogin=require('../routes/Institutelogin')
const InName=require('../routes/institutename')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // specify your front-end origin
  credentials: true, // allow credentials (cookies, HTTP authentication)
}


app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api',Instituteregister,IN,InLogin,InName,addfacultyRoute);

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});