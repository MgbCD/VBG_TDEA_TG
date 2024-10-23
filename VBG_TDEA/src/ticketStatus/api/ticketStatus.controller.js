const { createTicketStatusUseCase } = require('../application/create-ticketStatus');
const { getAllTicketStatusesUseCase } = require('../application/get-statuses');

async function saveTicketStatus(req, res) {
    try {
        const newTicketStatus = await createTicketStatusUseCase(req.body);
        return res.status(201).json({ ticketStatus: newTicketStatus });
    } catch (error) {
        return res.status(500).json({error});
    }
}

async function getAllTicketStatuses(req, res) {
    try {
        const statuses = await getAllTicketStatusesUseCase();
        return res.status(200).json(statuses);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = { saveTicketStatus, getAllTicketStatuses };