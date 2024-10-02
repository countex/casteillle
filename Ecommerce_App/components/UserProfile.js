import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
    const { user } = useAuth();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">User Profile</h2>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role || 'User'}</p>
                    {/* Add more user details as needed */}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
}