import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for session management

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        const { productId, feedback, rating } = req.body;
        await saveFeedbackToDatabase({ productId, feedback, rating, userId: session.user.id }); // Implement this function to save feedback
        res.status(200).json({ success: true });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;