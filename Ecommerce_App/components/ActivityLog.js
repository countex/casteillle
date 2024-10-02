import { useEffect, useState } from 'react';
import { fetchActivityLogs } from '../utils/api'; // Assume this function fetches activity logs

export default function ActivityLog() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const getActivityLogs = async () => {
            const logData = await fetchActivityLogs();
            setLogs(logData);
        };
        getActivityLogs();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Activity Logs</h2>
            {logs.length > 0 ? (
                <ul>
                    {logs.map(log => (
                        <li key={log.id} className="border p-2 mb-2">
                            <p>{log.timestamp}: {log.action}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No activity logs found.</p>
            )}
        </div>
    );
}