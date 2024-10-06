const { userModel } = require('../models/user.model');

async function createUserRepository(userRequest) {
    try {
      const user = new userModel({
        email: userRequest.email,
        username: userRequest.username,
        roleId: userRequest.roleId,
        program: userRequest.roleId === 'student' ? userRequest.program : null,
        lastLogin: new Date(),
      });
  
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
        console.log('Error al guardar el usuario:', error); // Para revisar en el servidor
        throw new Error('Error saving user: ' + error.message);
    }
  }
  
  module.exports = { createUserRepository };