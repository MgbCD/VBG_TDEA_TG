const { createTicketActionUseCase } = require('../application/create-ticketAction');
const { findUserByIdentityId } = require('../../user/infrastructure/repositories/userRepository');

async function saveTicketAction(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);
        if (!user || user.roleId !== 'admin') {
            return res.status(403).json({ message: 'Solo los administradores pueden hacer esta accion' });
        }

        const newTicketAction = await createTicketActionUseCase(req.body);
        return res.status(201).json({ ticketAction: newTicketAction });
    } catch (error) {
        return res.status(500).json({error});
    }
}

module.exports = { saveTicketAction };