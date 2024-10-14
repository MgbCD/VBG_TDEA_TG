const ticketModel = require('../../../src/ticket/infrastructure/models/ticket.model');
const userModel = require('../../../src/user/infrastructure/models/user.model');

async function getTicketsStats(startDate, endDate) {
    const query = {
        createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
    };

    const stats = await ticketModel.aggregate([
        { $match: query },
        { $group: { _id: "$statusId", count: { $sum: 1 } } },
        {
            $lookup: {
                from: 'ticketstatuses', 
                localField: '_id',
                foreignField: '_id',
                as: 'status'
            }
        },
        { $unwind: '$status' },
        { $project: { _id: 0, status: '$status.status', count: 1 } }
    ]);

    return stats;
}

async function getUserStats(startDate, endDate) {
    const query = {
        lastLogin: { $gte: new Date(startDate), $lt: new Date(endDate) }
    };

    const count = await userModel.countDocuments(query);
    return count;
}

module.exports = { getTicketsStats, getUserStats };
