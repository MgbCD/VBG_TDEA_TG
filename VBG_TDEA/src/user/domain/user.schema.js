const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    ref: 'UserRole',
    required: true,
  },

  program: {
    type: String, 
    default: null,
  },

}, {
  timestamps: true
});


module.exports = { userSchema };