const { createOrUpdateEmailConfigUseCase } = require('../application/update-emailConfig');
const { getEmailConfigUseCase } = require('../application/get-emailConfig');

const updateEmailConfig = async (req, res) => {
    try {
        const configData = req.body;
        const updatedConfig = await createOrUpdateEmailConfigUseCase(configData);
        res.status(200).json(updatedConfig);
    } catch (error) {
        res.status(500).json({ message: `Error actualizando la configuración: ${error.message}` });
    }
};

const getEmailConfiguration = async (req, res) => {
    try {
        const config = await getEmailConfigUseCase();
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: `Error obteniendo la configuración: ${error.message}` });
    }
};

module.exports = { updateEmailConfig, getEmailConfiguration };
