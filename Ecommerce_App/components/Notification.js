import { useEffect, useState } from 'react';

export default function Notification({ message, duration = 3000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="bg-blue-500 text-white p-4 rounded">
            {message}
        </div>
    );
}