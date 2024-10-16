const { findUserByEmailRepository } = require('../infrastructure/repositories/userRepository');

async function findUserUseCase(email) {
  return await findUserByEmailRepository(email);
}

module.exports = { findUserUseCase };
