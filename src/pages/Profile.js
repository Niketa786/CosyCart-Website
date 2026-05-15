import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:8080/api/orders/user/${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error("Orders fetch error:", err));
        }
    }, [user]);

    // --- Naya Logic: 24 Hours Check karne ke liye ---
    const isExpired = (orderDate) => {
    if (!orderDate) return false;
    
    const placed = new Date(orderDate);
    // Agar date 1970 ya usse purani hai, toh use expired mat maano
    if (placed.getFullYear() <= 1970) return false; 

    const now = new Date();
    const diffInHours = (now - placed) / (1000 * 60 * 60);
    return diffInHours > 24;
};

    // --- YE WALA FUNCTION UPDATE KIYA HAI ---
    const handleCancel = (id) => {
        if(window.confirm("Are you sure you want to cancel this order?")) {
            fetch(`http://localhost:8080/api/orders/delete/${id}`, {
                method: 'DELETE',
            })
            .then(res => {
                if(res.ok) {
                    // UI se order hatane ke liye state update
                    const updatedOrders = orders.filter(order => order.id !== id);
                    setOrders(updatedOrders); 
                    alert("Order Cancelled Successfully! ✖");
                } else {
                    alert("Order cancel nahi ho paya. Backend check karein.");
                }
            })
            .catch(err => console.error("Error cancelling order:", err));
        }
    };

    // --- Tracking Logic: Progress Bar ke liye ---
    const getProgressWidth = (status, orderDate) => {
        if (status === 'Delivered') return '100%';
        if (status === 'Shipped' || isExpired(orderDate)) return '60%';
        if (status === 'Pending') return '20%';
        return '0%';
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-4 text-center" style={{ borderRadius: '15px' }}>
                        <div className="bg-warning text-dark rounded-circle d-inline-flex justify-content-center align-items-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <h4 className="fw-bold">{user?.name || "User Name"}</h4>
                        <p className="text-muted">{user?.email}</p>
                        <hr />
                        <button className="btn btn-outline-danger btn-sm w-100 rounded-pill">Edit Profile</button>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="fw-bold mb-4">My Orders 📦</h3>
                    {orders.length > 0 ? (
                        [...orders].reverse().map(order => ( 
                            <div key={order.id} className="card shadow-sm border-0 mb-3 p-3" style={{ borderRadius: '12px' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold mb-1 text-uppercase">{order.productName}</h6>
                                        <p className="text-muted small mb-0">Order ID: #CZ-{order.id}</p>
                                        
                                        {/* --- Message Logic --- */}
                                        {isExpired(order.orderDate) ? (
                                            <p className="text-info small fw-bold mt-2 mb-0">
                                                ✅ Your order has been shipped! Expected delivery: {
                                                    new Date(new Date(order.orderDate).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()
                                                }
                                            </p>
                                        ) : (
                                            order.status === 'Pending' && (
                                                <button 
                                                    className="btn btn-link text-danger p-0 mt-2 small" 
                                                    onClick={() => handleCancel(order.id)}
                                                    style={{ textDecoration: 'none', fontSize: '0.8rem' }}
                                                >
                                                    ✖ Cancel Order (Available for 24h)
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <div className="text-end">
                                        <span className={`badge rounded-pill px-3 py-2 ${
                                            order.status === 'Delivered' ? 'bg-success' : 
                                            order.status === 'Shipped' || isExpired(order.orderDate) ? 'bg-info' : 'bg-warning text-dark'
                                        }`}>
                                            {isExpired(order.orderDate) && order.status === 'Pending' ? 'Shipped' : order.status}
                                        </span>
                                        <h6 className="mt-2 fw-bold text-primary">₹{order.price}</h6>
                                    </div>
                                </div>

                                {/* --- Naya Tracking Bar Logic --- */}
                                <div className="mt-4 px-2">
                                    <div className="progress" style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
                                        <div 
                                            className="progress-bar bg-success progress-bar-striped progress-bar-animated" 
                                            role="progressbar" 
                                            style={{ width: getProgressWidth(order.status, order.orderDate) }}
                                        ></div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 text-muted" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                                        <span className="text-success">Placed</span>
                                        <span className={getProgressWidth(order.status, order.orderDate) >= '40%' ? 'text-success' : ''}>Confirmed</span>
                                        <span className={getProgressWidth(order.status, order.orderDate) >= '60%' ? 'text-success' : ''}>Shipped</span>
                                        <span className={getProgressWidth(order.status, order.orderDate) >= '80%' ? 'text-success' : ''}>Out for Delivery</span>
                                        <span className={order.status === 'Delivered' ? 'text-success' : ''}>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-5 bg-light rounded" style={{ border: '2px dashed #ddd' }}>
                            <p className="text-muted">You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;