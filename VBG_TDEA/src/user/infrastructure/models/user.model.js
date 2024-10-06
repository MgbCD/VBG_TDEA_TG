const mongoose = require('mongoose');
const { userSchema } = require('../../domain/user.schema');

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };