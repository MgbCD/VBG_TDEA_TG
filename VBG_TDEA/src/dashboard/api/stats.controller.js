
const { getTicketsStats, getUserStats } = require('../application/statsUseCase');

async function getDashboardStats(req, res) {
    try {
        const { startDate, endDate } = req.query;  

        const ticketStats = await getTicketsStats(startDate, endDate);
        const userStats = await getUserStats(startDate, endDate);

        return res.status(200).json({
            ticketStats,
            userStats
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener estadísticas del dashboard', error });
    }
}

module.exports = { getDashboardStats };
