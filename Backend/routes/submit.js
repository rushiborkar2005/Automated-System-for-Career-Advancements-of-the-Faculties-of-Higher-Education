// const express = require('express');
// const router = express.Router();
// const User = require('./Models/user');
// const app=express();
// app.use(express.json());
// router.post('/login', async (req, res) => {
//   console.log(req.body);
//   const { LoginAS1,Name,Password } = req.body;
//   /*const newuser=new User({username:Name,password:Password})
//   await newuser.save();
//   res.status(400).json({message:'Done'})*/
//   try {
//       const user = await User.findOne({ kon:LoginAS1,username:Name });
//       if (!user) {
//           return res.status(400).json({ message: 'Invalid username or password.',ok:0 });
//       }

//       const isMatch = (Password==user.password);
//       if (!isMatch) {
//           return res.status(400).json({ message: 'Invalid username or password.' ,ok:0 });
//       }
//       res.status(200).json({ message: 'Login successful!',ok:1  });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// module.exports = submit;