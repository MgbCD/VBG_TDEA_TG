const { userModel } = require('../models/user.model');

async function createUserRepository(userRequest) {
  try {
    const user = new userModel({
      identityId: userRequest.identityId,
      email: userRequest.email,
      username: userRequest.username,
      roleId: userRequest.roleId,
      program: userRequest.roleId === 'student' ? userRequest.program : null,
      lastLogin: new Date(),
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    console.log('Error al guardar el usuario:', error);
    throw new Error('Error saving user: ' + error.message);
  }
}

async function findUserByIdentityId(identityId) {
  try {
    return await userModel.findOne({ identityId });
  } catch (error) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
}

async function findUserByEmailRepository(email) {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
}

async function getAdminsEmailsRepository() {
  try{
    const admins = await userModel.find({ roleId: 'admin' }, 'email'); // Solo traemos el campo 'email'
    const adminEmails = admins.map(admin => admin.email);
    return adminEmails;
  } catch (error) {
    console.error('Error obteniendo los correos de los administradores:', error);
    throw new Error('No se pudieron obtener los correos de los administradores');
  }
} 

module.exports = { createUserRepository, findUserByIdentityId, findUserByEmailRepository, getAdminsEmailsRepository };