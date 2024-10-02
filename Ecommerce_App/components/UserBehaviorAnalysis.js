import { useEffect, useState } from 'react';
import { fetchUserBehaviorData } from '../utils/api'; // Assume this function fetches user behavior data

export default function UserBehaviorAnalysis() {
    const [behaviorData, setBehaviorData] = useState([]);

    useEffect(() => {
        const getBehaviorData = async () => {
            const data = await fetchUserBehaviorData();
            setBehaviorData(data);
        };
        getBehaviorData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Behavior Analysis</h2>
            {behaviorData.length > 0 ? (
                <ul>
                    {behaviorData.map(item => (
                        <li key={item.id} className="border p-2 mb-2">
                            <p>User ID: {item.userId}</p>
                            <p>Pages Visited: {item.pagesVisited.join(', ')}</p>
                            <p>Time Spent: {item.timeSpent} minutes</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No behavior data available.</p>
            )}
        </div>
    );
}