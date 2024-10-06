const { createTicketStatusUseCase } = require('../application/create-ticketStatus');

async function saveTicketStatus(req, res) {
    try {
        const newTicketStatus = await createTicketStatusUseCase(req.body);
        return res.status(201).json({ ticketStatus: newTicketStatus });
    } catch (error) {
        return res.status(500).json({error});
    }
}

module.exports = { saveTicketStatus };