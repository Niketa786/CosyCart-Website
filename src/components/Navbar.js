import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Hook use karna better hai

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { cart } = useCart(); // Yahan useCart hook use kar rahe hain error se bachne ke liye
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        alert("Logged Out Successfully!");
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <div className="bg-warning text-dark rounded-circle d-inline-flex justify-content-center align-items-center me-2" style={{ width: '35px', height: '35px', fontWeight: 'bold' }}>C</div>
                    COSYCART
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        {/* Fix: MEN ki spelling check karo yahan */}
                        <li className="nav-item"><Link className="nav-link" to="/?category=MEN">MEN</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/?category=WOMEN">WOMEN</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/?category=LIFESTYLE">LIFESTYLE</Link></li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <Link to="/cart" className="text-white me-4 position-relative">
                            <i className="bi bi-cart3 fs-5"></i>
                            {cart && cart.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="dropdown">
                                <span className="text-white dropdown-toggle fw-bold" style={{ cursor: 'pointer' }} id="userDropdown" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle me-1"></i> Hi, {user.name}
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                    <li><Link className="dropdown-item py-2" to="/profile"><i className="bi bi-box-seam me-2"></i> My Orders</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item py-2 text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i> Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link className="btn btn-warning btn-sm fw-bold px-3" to="/login">LOGIN</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;