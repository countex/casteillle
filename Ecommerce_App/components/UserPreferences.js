import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { updateUserPreferences } from '../utils/api'; // Assume this function updates user preferences

export default function UserPreferences() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState({
        emailNotifications: user?.preferences?.emailNotifications || true,
        smsNotifications: user?.preferences?.smsNotifications || false,
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setPreferences((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserPreferences(user.id, preferences); // Implement this function to update preferences
        alert('Preferences updated successfully!');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Preferences</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={preferences.emailNotifications}
                        onChange={handleChange}
                    />
                    Email Notifications
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={preferences.smsNotifications}
                        onChange={handleChange}
                    />
                    SMS Notifications
                </label>
                <br />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Save Preferences
                </button>
            </form>
        </div>
    );
}