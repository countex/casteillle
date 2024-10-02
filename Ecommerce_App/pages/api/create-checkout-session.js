import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    const buf = await buffer(req);
    const { items } = JSON.parse(buf.toString());

    const line_items = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image],
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ id: session.id });
};

export default handler;