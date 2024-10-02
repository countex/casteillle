import { useEffect, useState } from 'react';
import { fetchUserSegments, applyPromotionToSegment } from '../utils/api'; // Assume these functions are implemented

export default function UserSegmentation() {
    const [segments, setSegments] = useState([]);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [promotion, setPromotion] = useState('');

    useEffect(() => {
        const getSegments = async () => {
            const segmentData = await fetchUserSegments();
            setSegments(segmentData);
        };
        getSegments();
    }, []);

    const handleApplyPromotion = async () => {
        if (selectedSegment) {
            await applyPromotionToSegment(selectedSegment, promotion);
            alert('Promotion applied successfully!');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Segmentation</h2>
            {segments.length > 0 ? (
                <ul>
                    {segments.map(segment => (
                        <li key={segment.id} className="border p-2 mb-2">
                            <p>Segment Name: {segment.name}</p>
                            <p>Description: {segment.description}</p>
                            <p>Number of Users: {segment.userCount}</p>
                            <button onClick={() => setSelectedSegment(segment.id)} className="bg-blue-500 text-white p-1">
                                Select Segment
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No segments available.</p>
            )}
            {selectedSegment && (
                <div>
                    <h3 className="text-xl">Apply Promotion</h3>
                    <input
                        type="text"
                        placeholder="Promotion Code"
                        value={promotion}
                        onChange={(e) => setPromotion(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={handleApplyPromotion} className="bg-green-500 text-white p-2">
                        Apply Promotion
                    </button>
                </div>
            )}
        </div>
    );
}