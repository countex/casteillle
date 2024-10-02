import { useEffect, useState } from 'react';
import { fetchABTests } from '../utils/api'; // Assume this function fetches A/B tests

export default function ABTesting() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const getTests = async () => {
            const testData = await fetchABTests();
            setTests(testData);
        };
        getTests();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">A/B Testing</h2>
            {tests.length > 0 ? (
                <ul>
                    {tests.map(test => (
                        <li key={test.id} className="border p-2 mb-2">
                            <p>Test Name: {test.name}</p>
                            <p>Description: {test.description}</p>
                            <p>Version A: {test.versionA}</p>
                            <p>Version B: {test.versionB}</p>
                            <p>Winner: {test.winner || 'Not determined yet'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No A/B tests available.</p>
            )}
        </div>
    );
}