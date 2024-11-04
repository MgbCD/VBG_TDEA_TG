const { createDenouncedRegisterUseCase } = require('../application/create-denouncedRegister');
const { getDenouncedRegisterByTicketIdUseCase } = require('../application/get-denouncedRegisterByTicketIs');
const { updateDenouncedRegisterUseCase } = require('../application/update-denouncedRegister');
const { deleteDenouncedRegisterUseCase } = require('../application/delete-denouncedRepository');

async function saveDenouncedRegister(req, res) {
    try {
        const newDenouncedRegister = await createDenouncedRegisterUseCase(req.body);
        return res.status(201).json({ denouncedRegister: newDenouncedRegister });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function getDenouncedRegisterByTicketId(req, res) {
    try {
        const { ticketId } = req.params;
        const denouncedRegister = await getDenouncedRegisterByTicketIdUseCase(ticketId);
        return res.status(200).json({ denouncedRegister });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function updateDenouncedRegister(req, res) {
    try {
        const { ticketId, denouncedData } = req.body;
        const updatedDenouncedRegister = await updateDenouncedRegisterUseCase(ticketId, denouncedData);
        return res.status(200).json({ denouncedRegister: updatedDenouncedRegister });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function deleteDenouncedRegister(req, res) {
    try {
        const { ticketId } = req.body;
        const deletedDenouncedRegister = await deleteDenouncedRegisterUseCase(ticketId);
        return res.status(200).json({ message: 'Registro eliminado', deletedDenouncedRegister });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

module.exports = { saveDenouncedRegister, getDenouncedRegisterByTicketId, updateDenouncedRegister, deleteDenouncedRegister };
