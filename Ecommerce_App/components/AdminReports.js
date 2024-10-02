import { useEffect, useState } from 'react';
import { fetchAdminReports } from '../utils/api'; // Assume this function fetches admin reports

export default function AdminReports() {
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const getReports = async () => {
            const reportData = await fetchAdminReports();
            setReports(reportData);
        };
        getReports();
    }, []);

    const filteredReports = reports.filter(report => {
        if (filter === 'all') return true;
        return report.type === filter; // Assuming reports have a type property
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Admin Reports</h2>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="sales">Sales Reports</option>
                <option value="user">User Reports</option>
                <option value="feedback">Feedback Reports</option>
            </select>
            {filteredReports.length > 0 ? (
                <ul>
                    {filteredReports.map(report => (
                        <li key={report.id} className="border p-2 mb-2">
                            <p>{report.title}</p>
                            <p>{report.description}</p>
                            <p>Generated on: {new Date(report.generatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
}