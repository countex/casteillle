import { useState } from 'react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    );
}