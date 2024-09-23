const { createTicketUseCase } = require('../application/create-ticket');
const { ExceptionMissingField } = require('../exceptions/ExceptionMissingField');
const { sendMessage } = require('../infrastructure/kafka/producer')

async function saveTicket(req, res) {
    try {

        const { title, description } = req.body;
        if (!title || !description) {
            throw new ExceptionMissingField();
        }
        const newTicket = await createTicketUseCase(req.body);
        await sendMessage(newTicket);
        return res.status(201).json({ ticket: newTicket });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = { saveTicket };