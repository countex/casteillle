import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for session management

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'PUT') {
        const { userId, preferences } = req.body;
        await updatePreferencesInDatabase(userId, preferences); // Implement this function to update preferences in the database
        res.status(200).json({ message: 'Preferences updated' });
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;