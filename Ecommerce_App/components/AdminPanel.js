import { useEffect, useState } from 'react';
import { fetchUsers, updateUserRoles } from '../utils/api'; // Assume these functions are implemented

export default function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const userData = await fetchUsers();
            setUsers(userData);
        };
        getUsers();
    }, []);

    const handleRoleChange = async (userId, newRoles) => {
        await updateUserRoles(userId, newRoles);
        setUsers(users.map(user => (user.id === userId ? { ...user, roles: newRoles } : user)));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>{user.email} - Roles: {user.roles.join(', ')}</p>
                        <select multiple onChange={(e) => handleRoleChange(user.id, Array.from(e.target.selectedOptions).map(option => option.value))} value={user.roles}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}