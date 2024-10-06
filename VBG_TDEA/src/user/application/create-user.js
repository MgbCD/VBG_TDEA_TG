const { createUserRepository } = require('../infrastructure/repositories/userRepository');

async function createUserUseCase(userRequest) {
    return await createUserRepository(userRequest);
}

module.exports = { createUserUseCase };