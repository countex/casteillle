import { useEffect, useState } from 'react';
import { fetchOrderDetails, cancelOrder } from '../utils/api'; // Assume these functions are implemented

export default function OrderDetails({ orderId }) {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrderDetails = async () => {
            const orderData = await fetchOrderDetails(orderId);
            setOrder(orderData);
        };
        getOrderDetails();
    }, [orderId]);

    const handleCancelOrder = async () => {
        const response = await cancelOrder(orderId);
        if (response.success) {
            alert('Order canceled successfully!');
            // Optionally, refresh order details or redirect
        } else {
            alert('Failed to cancel order.');
        }
    };

    if (!order) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <p>Order ID: {order.id}</p>
            <p>Total: ${order.total}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <p>Tracking Number: {order.trackingNumber || 'N/A'}</p>
            <h3>Items:</h3>
            <ul>
                {order.items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            {order.status === 'pending' && (
                <button onClick={handleCancelOrder} className="bg-red-500 text-white p-2">
                    Cancel Order
                </button>
            )}
        </div>
    );
}