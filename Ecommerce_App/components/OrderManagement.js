import { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus, fetchOrderDetails } from '../utils/api'; // Assume these functions are implemented

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            const orderData = await fetchAllOrders();
            setOrders(orderData);
        };
        getOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        await updateOrderStatus(orderId, newStatus);
        setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
    };

    const handleViewDetails = async (orderId) => {
        const orderDetails = await fetchOrderDetails(orderId);
        setSelectedOrder(orderDetails);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="border p-2 mb-2">
                        <p>Order ID: {order.id}</p>
                        <p>Total: ${order.total}</p>
                        <p>Status: {order.status}</p>
                        <button onClick={() => handleViewDetails(order.id)} className="bg-blue-500 text-white p-1">
                            View Details
                        </button>
                        <select onChange={(e) => handleStatusChange(order.id, e.target.value)} value={order.status}>
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </li>
                ))}
            </ul>
            {selectedOrder && (
                <div className="border p-4 mt-4">
                    <h3 className="text-xl font-bold">Order Details</h3>
                    <p>Order ID: {selectedOrder.id}</p>
                    <p>Total: ${selectedOrder.total}</p>
                    <p>Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <h4>Items:</h4>
                    <ul>
                        {selectedOrder.items.map(item => (
                            <li key={item.id}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}