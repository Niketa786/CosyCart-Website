import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = async () => {
        const result = await axios.get("http://localhost:8080/api/orders/all");
        setOrders(result.data);
    };

    const updateStatus = async (id, newStatus) => {
        await axios.put(`http://localhost:8080/api/orders/update-status/${id}`, newStatus, {
            headers: { "Content-Type": "text/plain" }
        });
        alert(`Order is now ${newStatus}`);
        loadAllOrders(); // Table refresh karne ke liye
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">CosyCart Admin - Order Management</h2>
            <table className="table table-hover shadow">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>User Email</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Address</th>
                        <th>Payment</th>
                        <th>Current Status</th>
                        <th>Order Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
  {orders.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.userEmail}</td>
      <td>{order.productName}</td>
      <td>₹{order.price}</td>
      
      {/* Address aur Payment ko yahan rakhein */}
      <td>{order.address}</td>
      <td>{order.paymentMethod}</td>

      
      {/* Status ko yahan rakhein */}
      <td>
        <span className={`badge ${order.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
          {order.status}
        </span>
      </td>

      <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "No Date"}</td>

      {/* Buttons last mein */}
      <td style={{ width: '250px', minWidth: '250px' }}> 
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', flexWrap: 'nowrap' }}>
        <button className="btn btn-info btn-sm" style={{ padding: '4px 8px' }} onClick={() => updateStatus(order.id, 'Shipped')}>Ship</button>
        <button className="btn btn-success btn-sm" style={{ padding: '4px 8px' }} onClick={() => updateStatus(order.id, 'Delivered')}>Deliver</button>
        <button className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }} onClick={() => updateStatus(order.id, 'Cancelled')}>Cancel</button>
    </div>
</td>
      
    </tr>
  ))}
</tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;