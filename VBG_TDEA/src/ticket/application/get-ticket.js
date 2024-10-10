const { getAllTicketsRepository, getTicketsByUserRepository } = require('../infrastructure/repositories/ticketRepository');

async function getTicketsByUserUseCase(user) {
    if (user.roleId === 'admin') {
        const tickets = await getAllTicketsRepository();
        return tickets;
    } else {
        const tickets = await getTicketsByUserRepository(user._id);
        return tickets;
    }
}

module.exports = { getTicketsByUserUseCase };
