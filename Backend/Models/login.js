const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  kon:String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);