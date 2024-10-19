const emailConfigModel = require('../models/emailConfig.model');
require('dotenv').config();
const crypto = require('crypto');

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

const encryptPassword = (password) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

const decryptPassword = (hash) => {
    const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};

const createOrUpdateEmailConfigRepository = async (configData) => {
    const encryptedPassword = encryptPassword(configData.password);
    const config = await emailConfigModel.findOneAndUpdate(
        {},
        { ...configData, password: encryptedPassword },
        { new: true, upsert: true }
    );
    return config;
};

const getEmailConfigRepository = async () => {
    const config = await emailConfigModel.findOne();
    if (config) {
        config.password = decryptPassword(config.password);
    }
    return config;
};


module.exports = { createOrUpdateEmailConfigRepository, getEmailConfigRepository };
