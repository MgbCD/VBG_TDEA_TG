const { getEmailConfigRepository } = require('../infrastructure/repositories/emailConfigRepository');

async function getEmailConfigUseCase() {
    return await getEmailConfigRepository();
}

module.exports = { getEmailConfigUseCase };