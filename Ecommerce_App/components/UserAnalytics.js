import { useEffect, useState } from 'react';
import { fetchUserAnalytics } from '../utils/api'; // Assume this function fetches user analytics

export default function UserAnalytics() {
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {
        const getAnalytics = async () => {
            const analyticsData = await fetchUserAnalytics();
            setAnalytics(analyticsData);
        };
        getAnalytics();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Analytics</h2>
            {analytics.length > 0 ? (
                <ul>
                    {analytics.map((item) => (
                        <li key={item.id} className="border p-2 mb-2">
                            <p>User ID: {item.userId}</p>
                            <p>Total Purchases: {item.totalPurchases}</p>
                            <p>Last Visit: {new Date(item.lastVisit).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No analytics data available.</p>
            )}
        </div>
    );
}