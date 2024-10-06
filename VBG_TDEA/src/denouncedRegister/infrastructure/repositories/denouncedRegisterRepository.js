const denouncedRegisterModel = require('../models/denouncedRegister.model');

async function createDenouncedRegisterRepository(denouncedRegisterRequest) {
    try {
        const denouncedRegister = new denouncedRegisterModel({
            ticketId: denouncedRegisterRequest.ticketId,
            denouncedName: denouncedRegisterRequest.denouncedName,
            denouncedId: denouncedRegisterRequest.denouncedId,
            denouncedPhone: denouncedRegisterRequest.denouncedPhone,
            denouncedEmail: denouncedRegisterRequest.denouncedEmail,
            relationshipWithVictim: denouncedRegisterRequest.relationshipWithVictim,
            additionalInfo: denouncedRegisterRequest.additionalInfo,
            createdBy: denouncedRegisterRequest.createdBy,
        });

        const savedDenouncedRegister = await denouncedRegister.save();
        return savedDenouncedRegister;
    } catch (error) {
        throw new Error(`Error al crear el registro del denunciado: ${error.message}`);
    }
}

async function getDenouncedRegisterByTicketIdRepository(ticketId) {
    try {
        const denouncedRegister = await denouncedRegisterModel.findOne({ ticketId });
        return denouncedRegister;
    } catch (error) {
        throw new Error(`Error al obtener el registro del denunciado: ${error.message}`);
    }
}

async function updateDenouncedRegisterRepository(ticketId, updateRequest) {
    try {
        const updatedRegister = await denouncedRegisterModel.findOneAndUpdate(
            { ticketId },
            updateRequest,
            { new: true }
        );
        return updatedRegister;
    } catch (error) {
        throw new Error(`Error al actualizar el registro de denuncia: ${error.message}`);
    }
}

async function listDenouncedRegistersRepository(filter, pagination) {
    try {
        const registers = await denouncedRegisterModel.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit);
        return registers;
    } catch (error) {
        throw new Error(`Error al listar los registros de denuncia: ${error.message}`);
    }
}

async function deleteDenouncedRegisterRepository(ticketId) {
    try {
        await denouncedRegisterModel.findOneAndDelete({ ticketId });
        return { message: "Registro de denuncia eliminado exitosamente." };
    } catch (error) {
        throw new Error(`Error al eliminar el registro de denuncia: ${error.message}`);
    }
}

module.exports = { createDenouncedRegisterRepository, getDenouncedRegisterByTicketIdRepository, updateDenouncedRegisterRepository, listDenouncedRegistersRepository, deleteDenouncedRegisterRepository };
