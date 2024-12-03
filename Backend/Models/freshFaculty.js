const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, },

    password: { type: String, required: true, minlength: 6, },

    instituteName: {type: String, required: true, trim: true,  },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
