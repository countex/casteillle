import { useState } from 'react';
import { submitFeedback } from '../utils/api'; // Assume this function submits feedback

export default function UserFeedback({ productId }) {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await submitFeedback({ productId, feedback, rating });
        if (response.success) {
            setMessage('Feedback submitted successfully!');
            setFeedback('');
            setRating(1);
        } else {
            setMessage('Failed to submit feedback.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback"
                    className="border p-2 w-full"
                    required
                />
                <div>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className="border p-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Submit Feedback
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}