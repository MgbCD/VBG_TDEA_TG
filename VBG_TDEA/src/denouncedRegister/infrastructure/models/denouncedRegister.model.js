const mongoose = require("mongoose");
const { denouncedRegisterSchema } = require('../../domain/denouncedRegister.schema');

const denouncedRegisterModel = mongoose.model('DenouncedRegister', denouncedRegisterSchema);

module.exports = denouncedRegisterModel;