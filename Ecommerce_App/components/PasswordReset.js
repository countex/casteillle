import { useState } from 'react';
import { auth } from '../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Send Reset Email
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}