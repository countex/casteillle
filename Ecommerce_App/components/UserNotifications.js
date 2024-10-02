import { useEffect, useState } from 'react';
import { fetchUserNotifications } from '../utils/api'; // Assume this function fetches user notifications

export default function UserNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const getNotifications = async () => {
            const notificationData = await fetchUserNotifications();
            setNotifications(notificationData);
        };
        getNotifications();
    }, []);

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        return notification.type === filter; // Assuming notifications have a type property
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="order">Order Updates</option>
                <option value="promotion">Promotions</option>
                <option value="system">System Notifications</option>
            </select>
            {filteredNotifications.length > 0 ? (
                <ul>
                    {filteredNotifications.map(notification => (
                        <li key={notification.id} className="border p-2 mb-2">
                            <p>{notification.message}</p>
                            <p>{new Date(notification.timestamp).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications found.</p>
            )}
        </div>
    );
}