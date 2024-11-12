const ticketModel = require('../../ticket/infrastructure/models/ticket.model');
const { userModel } = require('../../user/infrastructure/models/user.model');

async function getTicketsStats(startDate, endDate) {
    const query = {
        createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
    };

    const stats = await ticketModel.aggregate([
        { $match: query },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                    statusId: "$statusId",
                },
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'ticketstatuses',
                localField: '_id.statusId',
                foreignField: '_id',
                as: 'status'
            }
        },
        { $unwind: '$status' },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                status: '$status.status',
                count: 1
            }
        }
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
