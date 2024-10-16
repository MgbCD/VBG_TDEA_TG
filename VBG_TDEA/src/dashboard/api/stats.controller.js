const Dashboard = require('../infrastructure/models/dashboard.model');
const { getTicketsStats, getUserStats } = require('../application/statsUseCase');

async function getDashboardStats(req, res) {
    try {
        const { startDate, endDate } = req.query;

        const ticketStats = await getTicketsStats(startDate, endDate);
        const userStats = await getUserStats(startDate, endDate);

        const dashboardData = new Dashboard({
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            ticketStats,
            userStats
        });

        await dashboardData.save();

        return res.status(200).json({
            ticketStats,
            userStats
        });

    } catch (error) {
        console.error('Error al obtener estadísticas del dashboard:', error);
        return res.status(500).json({ message: 'Error al obtener estadísticas del dashboard', error });
    }
}

module.exports = { getDashboardStats };
