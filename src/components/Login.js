import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for backend call

const Login = () => {
    const [isRegister, setIsRegister] = useState(true); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();

    console.log("Location State in Login:", location.state);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { // Added async for API call
        e.preventDefault();
        
        if (isRegister) {
            try {
                // Register the user in the database
                await axios.post("http://localhost:8080/api/users/register", formData);
                alert("Account Created Successfully! Now please Login.");
                setIsRegister(false); 
            } catch (error) {
                alert("Registration Failed! User might already exist.");
            }
        } else {
            try {
                // VERIFICATION: Check if user exists in your MySQL database
                const response = await axios.post("http://localhost:8080/api/users/login", {
                    email: formData.email,
                    password: formData.password
                });

                // Only proceed if backend confirms the user
                if (response.status === 200) {
                    const userPayload = {
                        name: response.data.name || formData.email.split('@')[0], 
                        email: formData.email
                    };
                    localStorage.setItem('user', JSON.stringify(userPayload));
                    alert("Logged In Successfully!");

                    const pendingItem = JSON.parse(localStorage.getItem('pendingOrder'));
                    const from = location.state?.from || "/";

                    if (from === "/checkout") {
                        navigate("/checkout", { 
                            state: { selectedItem: pendingItem }, 
                            replace: true 
                        });
                        localStorage.removeItem('pendingOrder');
                    } else {
                        navigate("/");
                    }
                    
                    window.location.reload(); 
                }
            } catch (error) {
                // If user is not found or password is wrong, show alert
                alert("Invalid Email or Password! Please register first.");
            }
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <div className="bg-warning text-dark rounded-circle d-inline-flex justify-content-center align-items-center mb-2" style={{ width: '50px', height: '50px', fontWeight: 'bold', fontSize: '1.5rem' }}>C</div>
                    <h3 className="fw-bold">{isRegister ? "Create Account" : "Welcome Back"}</h3>
                    <p className="text-muted small">{isRegister ? "Sign up to start shopping" : "Login to access your cart"}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control bg-light" placeholder="Full Name" onChange={handleChange} required />
                        </div>
                    )}
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control bg-light" placeholder="Email Address" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control bg-light" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-white shadow-sm" style={{ backgroundColor: '#fb641b', border: 'none' }}>
                        {isRegister ? "SIGN UP" : "LOGIN"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small mb-0">
                        {isRegister ? "Already have an account?" : "New to CosyCart?"} 
                        <span className="text-primary fw-bold ms-1" style={{ cursor: 'pointer' }} onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? "Login here" : "Create an account"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;