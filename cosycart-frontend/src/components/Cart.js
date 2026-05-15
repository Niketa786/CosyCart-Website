import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate yahan add kiya hai

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate(); // Navigation function initialize kiya
    
    // State track karne ke liye ki kaunsa item select hua hai
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePlaceOrder = () => {
        if (selectedItem) {
            // Selected item ka sara data le kar Checkout page par bhej rahe hain
            navigate('/checkout', { state: { selectedItem } });
        } else {
            alert("Please select an item first! Click on 'BUY' to select.");
        }
    };

    return (
        <div className="container mt-5" style={{ minHeight: '80vh' }}>
            <h2 className="fw-bold mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center mt-5 p-5 border rounded bg-light">
                    <h4>Your cart is empty! 🛒</h4>
                    <Link to="/" className="btn btn-primary mt-3 rounded-pill px-4">Continue Shopping</Link>
                </div>
            ) : (
                <div className="row">
                    {/* Left Side: Product List */}
                    <div className="col-md-8">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="card mb-3 shadow-sm border-0 position-relative" style={{ borderRadius: '12px' }}>
                                
                                {/* X (Cross) Button - Top Right Corner */}
                                <button 
                                    className="btn position-absolute text-muted p-0"
                                    style={{ top: '5px', right: '10px', fontSize: '1.2rem', border: 'none', background: 'none', zIndex: 10 }}
                                    onClick={() => removeFromCart(item.id, item.size, item.name)}
                                >
                                    &times;
                                </button>

                                <div className="card-body p-3">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-3 col-md-2">
                                            <img src={item.image_url} className="img-fluid rounded" alt={item.name} style={{ maxHeight: '100px', objectFit: 'cover' }} />
                                        </div>
                                        <div className="col-5 col-md-6 px-3">
                                            <h5 className="fw-bold mb-1 text-truncate">{item.name}</h5>
                                            <p className="text-muted mb-0 small">Size: <b>{item.size || 'M'}</b> | Qty: <b>{item.quantity}</b></p>
                                            <h6 className="text-primary mt-2">₹{item.price} each</h6>
                                        </div>
                                        
                                        {/* Individual Buy Button */}
                                        <div className="col-4 col-md-4 text-end pe-2">
                                            <button 
                                                className={`btn btn-sm rounded-pill px-4 fw-bold mb-2 ${selectedItem?.id === item.id && selectedItem?.size === item.size ? 'btn-dark' : 'btn-outline-dark'}`}
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                {selectedItem?.id === item.id && selectedItem?.size === item.size ? 'SELECTED' : 'BUY'}
                                            </button>
                                            <div className="fw-bold text-dark small">Total: ₹{item.price * item.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Order Summary Card */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm p-4 sticky-top" style={{ borderRadius: '15px', backgroundColor: '#fdfdfd', top: '20px' }}>
                            <h4 className="fw-bold mb-4">Price Details</h4>
                            
                            {selectedItem ? (
                                <>
                                    <div className="alert alert-success py-2 small border-0" style={{ backgroundColor: '#e8f5e9' }}>
                                        Selected: <b>{selectedItem.name}</b>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 text-muted small">
                                        <span>Item Price</span>
                                        <span>₹{selectedItem.price}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 text-muted small">
                                        <span>Quantity</span>
                                        <span>{selectedItem.quantity}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                                        <span>Final Amount</span>
                                        <span>₹{selectedItem.price * selectedItem.quantity}</span>
                                    </div>

                                    <button 
                                        className="btn btn-warning w-100 py-3 fw-bold rounded-pill shadow-sm" 
                                        style={{ backgroundColor: '#fb641b', border: 'none', color: '#fff' }}
                                        onClick={handlePlaceOrder}
                                    >
                                        PLACE ORDER
                                    </button>
                                    <button className="btn btn-link btn-sm w-100 mt-2 text-muted text-decoration-none" onClick={() => setSelectedItem(null)}>
                                        Cancel Selection
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-muted small">Select an item and click <b>"BUY"</b> to proceed with your order.</p>
                                    <hr />
                                    <div className="d-flex justify-content-center gap-3 opacity-50">
                                        <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" height="20" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="15" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;