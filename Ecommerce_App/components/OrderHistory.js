import { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../utils/api'; // Assume this function fetches order history

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrderHistory = async () => {
            const orderData = await fetchOrderHistory();
            setOrders(orderData);
        };
        getOrderHistory();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Order History</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className="border p-2 mb-2">
                            <p>Order ID: {order.id}</p>
                            <p>Total: ${order.total}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Status: {order.status}</p>
                            <p>Tracking Number: {order.trackingNumber || 'N/A'}</p>
                            <button onClick={() => viewOrderDetails(order.id)}>View Details</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

const viewOrderDetails = (orderId) => {
    // Implement logic to view order details, possibly redirect to a new page
};