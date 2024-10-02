import { useEffect, useState } from 'react';
import { fetchAdminDashboardData } from '../utils/api'; // Assume this function fetches dashboard data

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        const getDashboardData = async () => {
            const data = await fetchAdminDashboardData();
            setDashboardData(data);
        };
        getDashboardData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <div>
                <h3>Total Users: {dashboardData.totalUsers}</h3>
                <h3>Total Orders: {dashboardData.totalOrders}</h3>
                <h3>Total Revenue: ${dashboardData.totalRevenue}</h3>
                <h3>Feedback Received: {dashboardData.feedbackCount}</h3>
            </div>
        </div>
    );
}