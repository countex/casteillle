import { useEffect, useState } from 'react';
import { fetchUserEngagementData } from '../utils/api'; // Assume this function fetches user engagement data

export default function UserEngagement() {
    const [engagementData, setEngagementData] = useState([]);

    useEffect(() => {
        const getEngagementData = async () => {
            const data = await fetchUserEngagementData();
            setEngagementData(data);
        };
        getEngagementData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Engagement Tracking</h2>
            {engagementData.length > 0 ? (
                <ul>
                    {engagementData.map(item => (
                        <li key={item.id} className="border p-2 mb-2">
                            <p>User ID: {item.userId}</p>
                            <p>Last Active: {new Date(item.lastActive).toLocaleString()}</p>
                            <p>Pages Visited: {item.pagesVisited.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No engagement data available.</p>
            )}
        </div>
    );
}