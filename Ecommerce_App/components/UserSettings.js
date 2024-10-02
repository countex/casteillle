import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import Notification from './Notification'; // Import the Notification component

export default function UserSettings() {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [notification, setNotification] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (user) {
            await updateProfile(user, { displayName, email });
            setNotification('Profile updated successfully!');
        }
    };

    return (
        <div className="p-4">
            {notification && <Notification message={notification} />}
            <h2 className="text-2xl font-bold">User Settings</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Update Profile
                </button>
            </form>
        </div>
    );
}