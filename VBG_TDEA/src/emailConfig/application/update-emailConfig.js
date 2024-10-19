const { createOrUpdateEmailConfigRepository } = require('../infrastructure/repositories/emailConfigRepository');

async function createOrUpdateEmailConfigUseCase(configData) {
    return await createOrUpdateEmailConfigRepository(configData);
}

module.exports = { createOrUpdateEmailConfigUseCase };