import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.selectedItem;
    const [paymentMethod, setPaymentMethod] = useState('Razorpay');
    // Naya state address ke liye
    const [address, setAddress] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user'); 
        if (!loggedInUser) {
            if (item) {
                localStorage.setItem('pendingOrder', JSON.stringify(item));
            }
            alert("Pehle account register ya login karein! 🛍️");
            navigate('/login', { state: { from: location.pathname } }); 
        }
    }, [navigate, location, item]);

    if (!item) {
        return (
            <div className="container mt-5 text-center">
                <h3 className="fw-bold">No item selected for checkout!</h3>
                <button className="btn btn-dark mt-3" onClick={() => navigate('/cart')}>Back to Cart</button>
            </div>
        );
    }

    const handleFinalOrder = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        const orderData = {
            userEmail: user.email,
            productName: item.name,
            price: item.price * item.quantity,
            status: "Pending",
            // Naye fields add kiye
            address: address,
            paymentMethod: paymentMethod
        };

        try {
            const response = await fetch("http://localhost:8080/api/orders/place", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert("Order Placed Successfully! 🎉");
                navigate('/profile'); 
            }
        } catch (error) {
            alert("Backend error!");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4 text-center">Checkout Details</h2>
            <div className="row">
                <div className="col-md-7">
                    <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3">Shipping Address</h5>
                        <form onSubmit={handleFinalOrder}>
                            <input type="text" className="form-control mb-3 bg-light" placeholder="Full Name" required />
                            <div className="row">
                                <div className="col-md-6 mb-3"><input type="text" className="form-control bg-light" placeholder="Mobile" required /></div>
                                <div className="col-md-6 mb-3"><input type="text" className="form-control bg-light" placeholder="Pincode" required /></div>
                            </div>
                            {/* Address yahan se capture ho raha hai */}
                            <textarea 
                                className="form-control mb-3 bg-light" 
                                placeholder="Full Address" 
                                rows="3" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></textarea>
                            
                            <h5 className="fw-bold mt-4 mb-3">Payment Method</h5>
                            <div className="border p-3 rounded mb-2" onClick={() => setPaymentMethod('Razorpay')} style={{cursor:'pointer', backgroundColor: paymentMethod === 'Razorpay' ? '#fff3cd' : 'white'}}>
                                <input type="radio" checked={paymentMethod === 'Razorpay'} readOnly /> Razorpay (Cards/UPI)
                            </div>
                            <div className="border p-3 rounded mb-4" onClick={() => setPaymentMethod('COD')} style={{cursor:'pointer', backgroundColor: paymentMethod === 'COD' ? '#fff3cd' : 'white'}}>
                                <input type="radio" checked={paymentMethod === 'COD'} readOnly /> Cash on Delivery
                            </div>

                            <button type="submit" className="btn btn-warning w-100 py-3 fw-bold text-white shadow" style={{ backgroundColor: '#fb641b', border: 'none' }}>
                                PLACE ORDER
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3">Order Summary</h5>
                        <div className="d-flex align-items-center mb-3">
                            <img src={item.image_url} alt={item.name} style={{ width: '60px', borderRadius: '8px' }} />
                            <div className="ms-3">
                                <p className="mb-0 fw-bold">{item.name}</p>
                                <p className="mb-0 text-muted small">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total:</span>
                            <span className="text-primary">₹{item.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;