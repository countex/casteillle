import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

export default function Checkout() {
    const { cartItems } = useCart();

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });
        const session = await response.json();

        // Save order to the database
        await saveOrderToDatabase(session.id, cartItems); // Implement this function to save the order

        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <button onClick={handleCheckout}>
            Checkout
        </button>
    );
}